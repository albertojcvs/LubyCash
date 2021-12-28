import { Client } from "../../models/Client";

export interface IClientRepository {
  create(client: Client): Promise<Client>;
  delete(id: number): Promise<void>;
  findBy(key: string, value: any): Promise<Client>;
  findAll(): Promise<Client[]>;
}
