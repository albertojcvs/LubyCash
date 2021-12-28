import { PrismaClient } from "@prisma/client";
import { AccountMapper } from "../../../mappers/AccountMapper";
import { Account } from "../../../models/Account";
import { IAccountRepository } from "../../interfaces/IAccoutRepository";

const prisma = new PrismaClient();
export class PrismaAccountReposiory implements IAccountRepository {
  async create(account: Account) {
    const newAccount = await prisma.account.create({
      data: AccountMapper.toPersistence(account),
    });

    return AccountMapper.toModel(newAccount);
  }
  async delete(id: number) {}

  async findAll() {
    const accounts = (await prisma.account.findMany()).map((account) =>
      AccountMapper.toModel(account)
    );

    return accounts;
  }

  async findByClientId(clientId: number) {
    const account = AccountMapper.toModel(
      await prisma.account.findFirst({
        where: { client_id: clientId },
        rejectOnNotFound: true,
      })
    );
      
    return account;
    
  }
}
