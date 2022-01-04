import { Kafka, Consumer as KafkaConsumer } from "kafkajs";
import { MailtrapMailProvider } from "../providers/implementations/mail/MailTrapMailProvider";
import { PrismaClientRepository } from "../repositories/implementations/prismaImplementations/PrismaClientRepository";
import { PrismaTransactionRepository } from "../repositories/implementations/prismaImplementations/PrismaTransactionRepository";
import { CreateClientHandler } from "./handlers/CreateClient";
import { PixTransactioHandler } from "./handlers/PixTransaction";

interface IConsumerProps {
  groupId: string;
}

const clientRepository = new PrismaClientRepository();
const transactionReposiory = new PrismaTransactionRepository();
const mailProvider = new MailtrapMailProvider();

export class Consumer {
  private consumer: KafkaConsumer;
  constructor({ groupId }: IConsumerProps) {
    const kafka = new Kafka({ brokers: ["lubycash_kafka_1:29092"] });

    this.consumer = kafka.consumer({ groupId });
  }

  public async consume() {
    const topics = ["pix-transaction", "create-client"] as const;

    await Promise.all(
      topics.map((topic) => {
        return this.consumer.subscribe({ topic, fromBeginning: false });
      })
    );

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (!message.value) return;
        const data = JSON.parse(message.value.toString());
        switch (topic) {
          case "pix-transaction":
            const pixTransactionHandler = new PixTransactioHandler(
              clientRepository,
              transactionReposiory,
              mailProvider
            );

            await pixTransactionHandler.handle(data);
            break;
          case 'create-client':
            const createClientHandler = new CreateClientHandler(clientRepository,mailProvider)
            await createClientHandler.handle(data)
            break;
          default:
            console.log("ERRORRRRRR");
        }
      },
    });
  }
}
