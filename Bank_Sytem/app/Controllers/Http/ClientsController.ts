import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateClientValidator from 'App/Validators/CreateClientValidator'
import axios from 'axios'
import { Client } from 'comunication/Client'
import { Producer } from '../../kafka/Producer'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateClientValidator)

    const clientResponse = await axios.get('http://ms_clients_app_1:3000/clients')

    const clients: Client[] = clientResponse.data

    const clientAlreadyExists = clients.filter((client) => data.email == client.email)[0]
    if (clientAlreadyExists)
      return response.status(409).send({
        error: {
          message: `The client already exists\n Client status: ${clientAlreadyExists.status}`,
        },
      })
    const producer = new Producer()

    await producer.produce({ topic: 'create-client', messages: [{ value: JSON.stringify(data) }] })
    return { succes: 'The client is being analyzed' }
  }

  public async index({ request }: HttpContextContract) {
    const { status, date_start, date_end } = request.qs()

    const response = await axios.get('http://ms_clients_app_1:3000/clients')
    const clients: Client[] = response.data

    if (status || date_start || date_end) {
      let filteredClients: Client[] = clients

      if (status) {
        filteredClients = clients.filter(
          (client) => client.status.toString().toLowerCase() == status.toLowerCase()
        )
      }

      if (date_start) {
        filteredClients = filteredClients.filter((client) => {
          client.createdAt = new Date(client.createdAt)

          const clientCreatedAtStartOfDay = new Date(
            client.createdAt.getFullYear(),
            client.createdAt.getMonth(),
            client.createdAt.getDate()
          ).getTime()

          const dateStartFilter = new Date(date_start).getTime()

          return clientCreatedAtStartOfDay >= dateStartFilter
        })
      }

      if (date_end) {
        filteredClients = filteredClients.filter((client) => {
          client.createdAt = new Date(client.createdAt)
          const clientCreatedAtStartOfDay = new Date(
            client.createdAt.getFullYear(),
            client.createdAt.getMonth(),
            client.createdAt.getDate()
          ).getTime()

          const dateEndFilter = new Date(date_end).getTime()

          return clientCreatedAtStartOfDay <= dateEndFilter
        })
      }

      return filteredClients
    }

    return clients
  }
}
