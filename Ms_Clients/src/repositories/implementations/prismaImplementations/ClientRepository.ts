import { PrismaClient } from ".prisma/client";
import { ClientStatus } from "../../../enums/ClientStatus";
import { Client } from "../../../models/Client";
import { IClientRepository } from "../../interfaces/IClientRepository";

const prisma = new PrismaClient();

function stringToClientStatus(status: string) {
  if (status == "APPROVED") return ClientStatus.APPROVED;
  return ClientStatus.REJECTD;
}

export class ClientRepository implements IClientRepository {
  async create(client: Client) {
    const {
      address,
      average_salary,
      cpf,
      state,
      phone_number,
      city,
      email,
      full_name,
      status,
      zipcode,
      id,
    } = await prisma.client.create({
      data: {
        full_name: client.fullname,
        average_salary: client.averageSalary,
        cpf: client.cpf,
        email: client.email,
        phone_number: client.phoneNumber,
        status: client.status.toString(),
        ...client.address,
      },
    });
    return new Client({
      id,
      fullname: full_name,
      cpf,
      averageSalary: average_salary,
      phoneNumber: phone_number,
      email: email,
      status: stringToClientStatus(status),
      address: {
        address,
        city,
        state,
        zipcode,
      },
    });
  }
  async delete(id: number): Promise<void> {}

  findAll(): Promise<Client[]> {}
  findBy(key: string, value: any): Promise<Client> {}
}
