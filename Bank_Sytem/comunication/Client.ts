import { Transaction } from "./Transaction";

export interface Client {
  id:number
  email: string
  cpf: string
  status: ClientStatus
  fullName: string
  balance: number
  createdAt: Date | string
  updatedAt: Date | string
  transactionsToClient: Transaction[]
  transactionsFromClient: Transaction[]
}

enum ClientStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
