import { Client } from ".prisma/client";

export class Transaction{
    public id!:number
    public toClient!:Client
    public fromClient!:Client
    public value!:number

    constructor(props:Transaction){
        Object.assign(this, props)
    }
}