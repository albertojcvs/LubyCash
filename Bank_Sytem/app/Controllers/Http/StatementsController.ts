import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { Client } from 'comunication/Client'

export default class StatementsController {
  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const clientsResponse = await axios.get('http://ms_clients_app_1:3000/clients')
    const allClients: Client[] = clientsResponse.data
    const client = allClients.filter((client: Client) => client.id == id)[0]
    if (!client)
      return response.status(404).send({ error: { message: 'The client was not found!' } })

    let statement = `This is the statment of the ${client.fullName}\n`

    statement += 'Money Recived:\n'
    let moneyRecived = 0

    client.transactionsToClient.forEach((transaction) => {
      const fromClient = allClients.filter((client) => client.id == transaction.fromClientId)[0]
      statement += `${transaction.value} from ${fromClient.fullName} at ${transaction.createdAt}\n`
      moneyRecived += transaction.value
    })

    statement += 'Money Sent:\n'

    let moneySent = 0

    client.transactionsFromClient.forEach((transaction) => {
      const toClient = allClients.filter((client) => client.id == transaction.toClientId)[0]
      statement += `${transaction.value} to ${toClient.fullName} at ${transaction.createdAt}\n`
      moneySent += transaction.value
    })

    statement += `Balance: ${moneyRecived - moneySent}`

    return statement
  }
}
