export interface Transaction{
  value:number
  fromClientId: number
  toClientId: number
  createdAt: string | Date
}
