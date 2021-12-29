import { Kafka, Consumer as KafkaConsumer } from "kafkajs";

interface IConsumerProps {
  groupId: string;
}

export class Consumer {
  private consumer: KafkaConsumer;
  constructor({ groupId }: IConsumerProps) {
    const kafka = new Kafka({ brokers: ["lubycash_kafka_1:29092"] });

    this.consumer = kafka.consumer({ groupId });
  }

  public async consume() {
    const topics = [] as const;

    await Promise.all(
      topics.map((topic) => {
        return this.consumer.subscribe({ topic, fromBeginning: false });
      })
    );

    await this.consumer.run({ eachMessage: async () => {} });
  }
}
