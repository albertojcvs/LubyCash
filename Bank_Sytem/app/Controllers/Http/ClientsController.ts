import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { Client } from 'comunication/Client'

export default class ClientsController {
  public async index({ request }: HttpContextContract) {
    const { status, date_start, date_end } = request.qs()

    const response = await axios.get('http://ms_clients_app_1:3000/clients')
    const clients: Client[] = response.data

    if (status || date_start || date_end) {
      let filteredClients: Client[] = clients
      console.log(date_end);

      if (status) {
        filteredClients = clients.filter(
          (client) => client.status.toString().toLowerCase() == status.toLowerCase()
        )
      }

      if (date_start) {
        filteredClients = filteredClients.filter((client) => {
          client.createdAt = new Date(client.createdAt  )
          console.log(client.createdAt.toString());

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
        console.log('bbbbbbbbbbbbbbb');

        filteredClients = filteredClients.filter((client) => {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', client.createdAt);
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
