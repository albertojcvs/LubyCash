export interface IMessageProps{
    to:string
    from:string
    subject:string
    body?:string
}
export interface IMailProvider{
    sendEmail(message:IMessageProps): Promise<void>
}