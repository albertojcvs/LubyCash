import { ClientStatus } from "../enums/ClientStatus";

interface IAddress{
  address:string
  state:string
  city:string
  zipcode:string
}

export class Client {
  public id!: number;

  public fullname!:string
  public email!:string
  public cpf!:string
  public phoneNumber!:string
  public averageSalary!:number
  public address!:IAddress
  
  public status!:ClientStatus

  constructor(props: Client) {
    Object.assign(this, props);
  }
}
