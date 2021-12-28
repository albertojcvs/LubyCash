import { Client } from "./Client";

export class Account {
  public id!: number;
  public client!: Client;
  public accountNumber: number;
  public balance!: number;

  constructor(props: Omit<Account, "accountNumber">) {
    Object.assign(this, props);

    if (!this.balance) this.balance = 0;
    this.accountNumber = Date.now();
  }
}
