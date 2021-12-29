import {
  Account as AccountPersistence,
  prisma,
  PrismaClient,
} from "@prisma/client";
import { Account } from "../models/Account";

export class AccountMapper {
  static toModel({
    id,
    balance,
    account_number,
    client_id,
  }: AccountPersistence) {
    return new Account({
      balance,
      clientId: client_id,
      id,
    }, account_number);
  }
  static toPersistence({id,clientId,accountNumber,balance}: Account) {
      return {
          id,
          client_id: clientId,
          account_number:accountNumber,
          balance
      }
  }
}
