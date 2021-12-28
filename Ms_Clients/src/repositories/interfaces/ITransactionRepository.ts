import { Transaction } from "../../models/Transaction";

export interface ITransactionRepository {
  create(props: Transaction): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  findAllByToClientId(toClientId:number): Promise<Transaction[]>;
  findAllByFromClientId(fromCliendD:number): Promise<Transaction[]>;
}
