import { ClientStatus } from "../enums/ClientStatus";

interface IAddress{
  address:string
  state:string
  city:string
  zipcode:string
}

export class Client {
  public id?: number;

  public fullname!:string
  public email!:string
  public cpf!:string
  public phoneNumber!:string
  public averageSalary!:number
  public address!:IAddress
  public balance!:number
  public status!:ClientStatus
  public createdAt?: Date
  public updatedAt?: Date

  constructor(props: Client) {
    Object.assign(this, props);
  }
}
