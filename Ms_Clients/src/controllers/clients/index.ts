import { Request, Response } from "express";
import { IAccountRepository } from "../../repositories/interfaces/IAccoutRepository";
import { IClientRepository } from "../../repositories/interfaces/IClientRepository";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";

export class ClientsController {
  private clientRepository: IClientRepository;
  private accountRepository: IAccountRepository;
  private transactionRepository: ITransactionRepository;
  constructor(
    clientRepository: IClientRepository,
    accountRepository: IAccountRepository,
    transactionRepository: ITransactionRepository
  ) {
    this.clientRepository = clientRepository;
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
  }

  public async getAll(request: Request, response: Response) {
    const allClients = await this.clientRepository.findAll();

    const allClientsWithInformation = allClients.map(
      async ({ address, ...client }) => {
        const { balance } = await this.accountRepository.findByClientId(
          client.id
        );
        const transactionsFromClient =
          await this.transactionRepository.findAllByFromClientId(client.id);

        const transactionsToClient =
          await this.transactionRepository.findAllByToClientId(client.id);

        return {
          ...client,
          ...address,
          balance,
          transactionsFromClient,
          transactionsToClient,
        };
      }
    );

    response.send(allClientsWithInformation);
  }
  public async getByEmail(request: Request, response: Response) {
    const { email } = request.params;
    const client = await this.clientRepository.findByEmail(email);
    response.send(client);
  }
}
