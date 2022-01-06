import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PixValidator from 'App/Validators/PixValidator'
import axios from 'axios'
import { Client, ClientStatus } from '../../../comunication/Client'
import { Producer } from 'App/kafka/Producer'

export default class PixController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { toUserCpf, value } = await request.validate(PixValidator)
    const user = auth.user

    if (user) {
      const producer = new Producer()

      const clientsResponse = await axios.get(`http://ms_clients_app_1:3000/clients`)
      const clients: Client[] = clientsResponse.data

      const loggedClient = clients.filter((client: Client) => user.email == client.email)[0]

      if (!loggedClient || loggedClient.status == ClientStatus.REJECTED ) {
        return response
          .status(400)
          .send({ error: { message: 'The authenticaded user is not a client!' } })
      }

      const toUser = clients.filter((client: Client) => toUserCpf == client.cpf)[0]

      if (toUser && toUser.status.toString() == ClientStatus.APPROVED.toString()) {
        if (loggedClient.balance >= value) {
          await producer.produce({
            topic: 'pix-transaction',
            messages: [
              {
                value: JSON.stringify({
                  fromClientId: loggedClient.id,
                  toClientId: toUser.id,
                  value,
                }),
              },
            ],
          })
        } else {
          return response
            .status(409)
            .send({ error: { message: 'The user does not have enough money!' } })
        }
      } else {
        return { error: { message: 'The user who you try to send money is not a client!' } }
      }
    }
  }
}
