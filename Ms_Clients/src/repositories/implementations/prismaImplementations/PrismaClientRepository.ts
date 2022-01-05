import { PrismaClient } from ".prisma/client";
import { ClientMapper } from "../../../mappers/ClientMapper";
import { Client } from "../../../models/Client";
import { IClientRepository } from "../../interfaces/IClientRepository";

const prisma = new PrismaClient();

export class PrismaClientRepository implements IClientRepository {
  async create(client: Client) {
    try {
      const newClient = await prisma.client.create({
        data: ClientMapper.toPersistence(client),
      });
      return new Client(ClientMapper.toModel(newClient));
    } catch (error:any) {
      console.log(error);
      return error
    }
  }
  async delete(id: number): Promise<void> {
    await prisma.client.delete({
      where: { id }
    });
  }

  async findAll() {
    const clients: Client[] = (await prisma.client.findMany()).map((client) =>
      ClientMapper.toModel(client)
    );

    return clients;
  }
  async findByEmail(email: string): Promise<Client> {
    const client: Client = ClientMapper.toModel(
      await prisma.client.findFirst({
        where: { email },
        rejectOnNotFound: true,
      })
    );

    return client;
  }

  async update(client: Client) {
    const clientUpdated = await prisma.client.update({
      data: ClientMapper.toPersistence(client),
      where: { id: client.id },
    });
    return ClientMapper.toModel(clientUpdated);
  }

  async findById(id: number) {
    const client = await prisma.client.findFirst({
      where: { id },
      rejectOnNotFound: true,
    });

    return ClientMapper.toModel(client);
  }
}
