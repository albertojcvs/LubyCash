import { Transaction as TransactionPersistence } from "@prisma/client";
import { Transaction } from "../models/Transaction";

export class TransactionMapper {
  static toModel({
    id,
    from_client_id,
    to_client_id,
    value,
  }: TransactionPersistence) {
    return new Transaction({
      id,
      fromClientId: from_client_id,
      toClientId: to_client_id,
      value,
    });
  }
  static toPersistence({ id, fromClientId, toClientId, value }: Transaction) {
    return {
      id,
      from_client_id: fromClientId,
      to_client_id: toClientId,
      value,
    };
  }
}
