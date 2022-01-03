import { Transaction } from "../../models/Transaction";
import { IClientRepository } from "../../repositories/interfaces/IClientRepository";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";

interface IPixTransactionProps {
  clientRepository: IClientRepository;
  transactionRepository: ITransactionRepository;
}

export class PixTransactioHandler {
  private clientRepository: IClientRepository;
  private transactionRepository: ITransactionRepository;

  constructor({
    clientRepository,
    transactionRepository,
  }: IPixTransactionProps) {
    this.clientRepository = clientRepository;
    this.transactionRepository = transactionRepository;
  }

  public async handle(transaction: Transaction) {
    await this.transactionRepository.create(transaction);
  }
}
