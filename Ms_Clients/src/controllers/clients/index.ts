import { Request, Response } from "express";
import { IAccountRepository } from "../../repositories/interfaces/IAccoutRepository";
import { IClientRepository } from "../../repositories/interfaces/IClientRepository";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";

export class ClientsController {
  constructor(
    private clientRepository: IClientRepository,
    private transactionRepository: ITransactionRepository
  ) {
    this.clientRepository = clientRepository;
    this.transactionRepository = transactionRepository;
  }

  public async getAll(request: Request, response: Response) {
    const allClients = await this.clientRepository.findAll();

    const allClientsWithInformation = await Promise.all(
      allClients.map(async ({ address, ...client }) => {
        if (!client.id) return;

        const transactionsFromClient =
          await this.transactionRepository.findAllByFromClientId(client.id);

        const transactionsToClient =
          await this.transactionRepository.findAllByToClientId(client.id);

        console.log({
          ...client,
          ...address,
          transactionsFromClient,
          transactionsToClient,
        });

        return {
          ...client,
          ...address,
          transactionsFromClient,
          transactionsToClient,
        };
      })
    );

    response.json(allClientsWithInformation);
  }
  public async getByEmail(request: Request, response: Response) {
    const { email } = request.params;
    const client = await this.clientRepository.findByEmail(email);
    response.send(client);
  }
}
