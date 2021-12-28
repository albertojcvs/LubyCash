import { Account } from "../../models/Account";

export interface IAccountRepository {
  create(account: Account): Promise<Account>;
  delete(id: number): Promise<void>;
  findByClientId(clientId: number): Promise<Account>;
  findAll(): Promise<Account[]>;
}
