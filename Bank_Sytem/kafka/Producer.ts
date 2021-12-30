import { Kafka, Message, Producer as KafkaProducer } from 'kafkajs'

interface IProduceProps {
  topic: string
  messages: Message[]
}

export class Producer {
  private producer: KafkaProducer
  constructor() {
    const kafka = new Kafka({ brokers: ['lubycash_kafka_1:29092'] })
    this.producer = kafka.producer()
  }

  public async produce({ topic, messages }: IProduceProps) {
    await this.producer.connect()
    await this.producer.send({ topic, messages })
    await this.producer.disconnect()
  }
}
