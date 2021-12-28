import { PrismaClient } from "@prisma/client";
import { TransactionMapper } from "../../../mappers/TranasctionMapper";
import { Transaction } from "../../../models/Transaction";
import { ITransactionRepository } from "../../interfaces/ITransactionRepository";

const prisma = new PrismaClient();

export class PrismaTransactionRepository implements ITransactionRepository {
  async create(transaction: Transaction) {
    const newTransaction = TransactionMapper.toModel(
      await prisma.transaction.create({
        data: TransactionMapper.toPersistence(transaction),
      })
    );

    return newTransaction;
  }

  async findAll() {
    const transactions = (await prisma.transaction.findMany()).map(
      (transaction) => TransactionMapper.toModel(transaction)
    );

    return transactions;
  }

  async findAllByToClientId(toClientId: number) {
    const transactions = (
      await prisma.transaction.findMany({ where: { to_client_id: toClientId } })
    ).map((transaction) => TransactionMapper.toModel(transaction));
    return transactions;
  }

  async findAllByFromClientId(fromCliendD: number) {
    const transactions = (
      await prisma.transaction.findMany({
        where: { from_client_id: fromCliendD },
      })
    ).map((transaction) => TransactionMapper.toModel(transaction));
    return transactions;
  }
}
