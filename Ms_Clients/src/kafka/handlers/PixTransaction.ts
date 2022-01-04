import { Transaction } from "../../models/Transaction";
import { IMailProvider } from "../../providers/interfaces/IMailProvider";
import { IClientRepository } from "../../repositories/interfaces/IClientRepository";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";

export class PixTransactioHandler {
  constructor(
    private clientRepository: IClientRepository,
    private transactionRepository: ITransactionRepository,
    private mailProvider: IMailProvider
  ) {}

  public async handle(transaction: Transaction) {
    await this.transactionRepository.create(transaction);

    const fromClient = await this.clientRepository.findById(
      transaction.fromClientId
    );
    const toClient = await this.clientRepository.findById(
      transaction.toClientId
    );

    fromClient.balance -= transaction.value;
    toClient.balance += transaction.value;

    await this.clientRepository.update(fromClient);
    await this.clientRepository.update(toClient);

    await this.mailProvider.sendEmail({
      to: fromClient.email,
      from: "lubycash@lubycash.com",
      subject: "You made a pix transaction",
      body: `<h1>Hey, ${fromClient.fullname.split(" ")[0]}</h1>
          <p>You sent R$${transaction.value} to ${
        toClient.fullname.split(" ")[0]
      }</p>`,
    });

    await this.mailProvider.sendEmail({
      to: toClient.email,
      from: "lubycash@lubycash.com",
      subject: "You recive a pix transaction",
      body: `<h1>Hey, ${toClient.fullname.split(" ")[0]}</h1>
          <p>You recive R$${transaction.value} from ${
        fromClient.fullname.split(" ")[0]
      }</p>`,
    });
  }
}
