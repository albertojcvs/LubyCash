import { Client } from "./Client";

export class Account {
  public id!: number;
  public clientId!: number;
  public accountNumber!: number;
  public balance!: number;

  constructor(props: Omit<Account,'accountNumber'>, accountNumber?:number) {
    Object.assign(this, props);

    if (!this.balance) this.balance = 0;
    if (!accountNumber) this.accountNumber = Date.now();
  }
}
