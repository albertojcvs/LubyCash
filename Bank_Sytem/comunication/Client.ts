import { Transaction } from "./Transaction";

export interface Client {
  id:number
  email: string
  cpf: string
 readonly status: ClientStatus
  fullname: string
  balance: number
  phoneNumber:string
  createdAt: Date | string
  updatedAt: Date | string
  transactionsToClient: Transaction[]
  transactionsFromClient: Transaction[]
}

export enum ClientStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
