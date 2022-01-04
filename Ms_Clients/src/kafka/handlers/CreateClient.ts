import { ClientStatus } from "../../enums/ClientStatus";
import { IMailProvider } from "../../providers/interfaces/IMailProvider";
import { IClientRepository } from "../../repositories/interfaces/IClientRepository";

interface ICreateClientMessageProps {
  fullname: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  averageSalary: number;
}

export class CreateClientHandler {
  constructor(
    private clientRepository: IClientRepository,
    private mailProvider: IMailProvider
  ) {}

  private analyseNewClient(averageSalarary: number) {
    return averageSalarary >= 500
      ? ClientStatus.APPROVED
      : ClientStatus.REJECTED;
  }

  public async handle({
    averageSalary,
    address,
    state,
    city,
    zipcode,
    ...clientData
  }: ICreateClientMessageProps) {
    const clientStatus = this.analyseNewClient(averageSalary);
    const clientAddress = {
      address,
      city,
      state,
      zipcode,
    };
    const balance = clientStatus == ClientStatus.APPROVED ? 200 : 0;

    const newClient = await this.clientRepository.create({
      ...clientData,
      address: clientAddress,
      averageSalary,
      status: clientStatus,
      balance,
    });

    await this.mailProvider.sendEmail({
      to: newClient.email,
      from: "lubycash@lubycash.com",
      subject: "Your account has been created!",
      body: `<h1>Hey, ${newClient.fullname.split(" ")[0]}</h1>
                <p> Your request to create a account was ${newClient.status.toString()}!</p>`,
    });
  }
}
