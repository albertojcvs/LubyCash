import { Client } from "../../models/Client";

export interface IClientRepository {
  create(client: Client): Promise<Client>;
  delete(id: number): Promise<void>;
  findByEmail(email: string): Promise<Client>;
  findAll(): Promise<Client[]>;
}
