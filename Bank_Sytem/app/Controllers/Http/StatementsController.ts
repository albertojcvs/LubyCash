import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { Client } from 'comunication/Client'
import { Transaction } from 'comunication/Transaction'
/// aaaaa
interface ITransactionEmail {
  date: string
  value: string
  toClient: string
  fromClient: string
}

export default class StatementsController {
  public async show({ params, request, response, auth }: HttpContextContract) {
    const { cpf } = params
    const { date_start, date_end } = request.qs()
    const clientsResponse = await axios.get('http://ms_clients_app_1:3000/clients')
    const allClients: Client[] = clientsResponse.data


    const client = allClients.filter((client: Client) => client.cpf == cpf)[0]

    const client = allClients.filter((client: Client) => client.id == id)[0]

    if (!client)
      return response.status(404).send({ error: { message: 'The client was not found!' } })

    let statement = `This is the statment of the ${client.fullname}\n`
    let transactionsFromClient: Transaction[] = client.transactionsFromClient
    let transactionsToClient: Transaction[] = client.transactionsToClient

    if (date_start) {
      const dateStartFilter = new Date(date_start).getTime()

      transactionsFromClient = transactionsFromClient.filter((transaction) => {
        transaction.createdAt = new Date(transaction.createdAt)

        const transactionCreatedAtStartOfDay = new Date(
          transaction.createdAt.getFullYear(),
          transaction.createdAt.getMonth(),
          transaction.createdAt.getDate()
        ).getTime()
        return transactionCreatedAtStartOfDay >= dateStartFilter
      })

      transactionsToClient = transactionsToClient.filter((transaction) => {
        transaction.createdAt = new Date(transaction.createdAt)

        const transactionCreatedAtStartOfDay = new Date(
          transaction.createdAt.getFullYear(),
          transaction.createdAt.getMonth(),
          transaction.createdAt.getDate()
        ).getTime()
        return transactionCreatedAtStartOfDay >= dateStartFilter
      })
    }
    if (date_end) {
      const dateEndFilter = new Date(date_end).getTime()

      transactionsFromClient = transactionsFromClient.filter((transaction) => {
        transaction.createdAt = new Date(transaction.createdAt)

        const transactionCreatedAtStartOfDay = new Date(
          transaction.createdAt.getFullYear(),
          transaction.createdAt.getMonth(),
          transaction.createdAt.getDate()
        ).getTime()
        return transactionCreatedAtStartOfDay <= dateEndFilter
      })

      transactionsToClient = transactionsToClient.filter((transaction) => {
        transaction.createdAt = new Date(transaction.createdAt)

        const transactionCreatedAtStartOfDay = new Date(
          transaction.createdAt.getFullYear(),
          transaction.createdAt.getMonth(),
          transaction.createdAt.getDate()
        ).getTime()
        return transactionCreatedAtStartOfDay <= dateEndFilter
      })
    }

    statement += 'Money Recived: '
    let moneyRecived = 0
    transactionsToClient.forEach((transaction) => {
      const fromClient = allClients.filter((client) => client.id == transaction.fromClientId)[0]
      statement += `${transaction.value} from ${
        fromClient.fullname
      } at ${transaction.createdAt.toLocaleString()}\n`
      moneyRecived += transaction.value
    })

    statement += moneyRecived + '\n'
    statement += 'Money Sent:\n'

    let moneySent = 0

    transactionsFromClient.forEach((transaction) => {
      const toClient = allClients.filter((client) => client.id == transaction.toClientId)[0]
      statement += `${transaction.value} to ${
        toClient.fullname
      } at ${transaction.createdAt.toLocaleString()}\n`
      moneySent += transaction.value
    })
    statement += moneySent + '\n'

    const balance = moneyRecived - moneySent
    statement += `Balance: ${balance}`

    const transactionFromClientEmailFormat: ITransactionEmail[] = transactionsFromClient.map(
      (transaction) => {
        const fromClient = allClients.filter((client) => client.id == transaction.toClientId)[0]
        const toClient = allClients.filter((client) => client.id == transaction.toClientId)[0]
        transaction.createdAt = new Date(transaction.createdAt)
        return {
          value: transaction.value.toPrecision(2),
          date: transaction.createdAt.toLocaleString(),
          fromClient: fromClient.fullname,
          toClient: toClient.fullname,
        }
      }
    )

    const transactionToClientEmailFormat: ITransactionEmail[] = transactionsToClient.map(
      (transaction) => {
        const fromClient = allClients.filter((client) => client.id == transaction.toClientId)[0]
        const toClient = allClients.filter((client) => client.id == transaction.toClientId)[0]

        transaction.createdAt = new Date(transaction.createdAt)
        return {
          value: transaction.value.toPrecision(),
          date: transaction.createdAt.toLocaleString(),
          fromClient: fromClient.fullname,
          toClient: toClient.fullname,
        }
      }
    )

    await Mail.sendLater((message) => {
      message
        .to(client.email)
        .from('lubycash@lubycash.com')
        .subject(`The bank statement of ${client.fullname}`)
        .htmlView('emails/statement', {
          adminUsername: auth.user?.email,
          transactionsToClient: transactionToClientEmailFormat,
          transactionsFromClient: transactionFromClientEmailFormat,
          balance,
          moneyRecived,
          moneySent,
          clientFullname: client.fullname,
        })
    })

    return {
      text: statement,
      transactionsToClient,
      transactionsFromClient,
      balance,
      moneyRecived,
      moneySent,
    }
  }
}
