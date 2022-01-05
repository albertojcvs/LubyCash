import { Transaction as TransactionPersistence } from "@prisma/client";
import { Transaction } from "../models/Transaction";

export class TransactionMapper {
  static toModel({
    id,
    from_client_id,
    to_client_id,
    value,
    created_at
  }: TransactionPersistence) {
    return new Transaction({
      id,
      fromClientId: from_client_id,
      toClientId: to_client_id,
      value,
      createdAt: created_at
    });
  }
  static toPersistence({ id, fromClientId, toClientId, value, createdAt }: Transaction) {
    return {
      id,
      from_client_id: fromClientId,
      to_client_id: toClientId,
      value,
    };
  }
}
