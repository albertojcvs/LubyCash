import { ClientStatus as ClientStatusPersistance } from "@prisma/client";
import { ClientStatus } from "../enums/ClientStatus";
export class ClientStatusMapper{
    static toModel(raw:ClientStatusPersistance):ClientStatus{
        if(raw == ClientStatusPersistance.APPROVED){
            return ClientStatus.APPROVED
        }
        return ClientStatus.REJECTED
    }

    static toPersistence(status:ClientStatus):ClientStatusPersistance{
        if(status == ClientStatus.APPROVED){
            return ClientStatusPersistance.APPROVED
        }
        return ClientStatusPersistance.REJECTED
    }
}