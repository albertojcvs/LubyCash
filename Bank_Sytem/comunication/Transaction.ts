export interface Transaction{
  value:number
  createdAt: Date | string
  fromClientId: number
  toClientId: number
}
