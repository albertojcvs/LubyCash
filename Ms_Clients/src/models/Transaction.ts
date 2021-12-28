export class Transaction {
  public id!: number;
  public toClientId!: number;
  public fromClientId!: number;
  public value!: number;

  constructor(props: Transaction) {
    Object.assign(this, props);
  }
}
