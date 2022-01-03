import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PixValidator from 'App/Validators/PixValidator'
import axios from 'axios'
import { Client } from 'comunication/Client'
import { Producer } from 'kafka/Producer'

export default class PixesController {
  public async store({ request, auth }: HttpContextContract) {
    const { toUserCpf, value } = await request.validate(PixValidator)
    const user = auth.user

    if (user) {
      const producer = new Producer()

      const response = await axios.get(`http://ms_clients_app_1:3000/clients`)
      const clients = response.data

      const loggedUser = clients.filter((client: Client) => user.email == client.email)
      const toUser = clients.filter((client: Client) => toUserCpf == client.cpf)

      if (toUser) {
        await producer.produce({
          topic: 'pix-transaction',
          messages: [
            {
              value: JSON.stringify({ fromClientId: loggedUser.id, toClientId: toUser.id, value }),
            },
          ],
        })
      }else{
        return {error:{message:"The user to recve the money does not exist in the system"}}
      }
    }
  }
}
