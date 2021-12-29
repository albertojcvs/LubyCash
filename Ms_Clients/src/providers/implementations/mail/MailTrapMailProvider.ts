import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import { IMailProvider, IMessageProps } from "../../interfaces/IMailProvider";
import mailConfigs from "../../../configs/mail";

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;
  constructor() {
    this.transporter = nodemailer.createTransport({ ...mailConfigs });
  }
  async sendEmail(message: IMessageProps) {
    await this.transporter.sendMail({
      to: message.to,
      from: message.from,
      subject: message.subject,
      html: message.body,
    });
  }
}
