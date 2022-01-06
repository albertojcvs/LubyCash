import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import axios from 'axios'
import { Client } from 'comunication/Client'

export default class LoginController {
  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    const token = await auth.use('api').attempt(email, password)

    const user = await User.query()
      .select('id', 'email', 'username')
      .where('email', email)
      .preload('permissions')
      .firstOrFail()

    const response = await axios.get('http://ms_clients_app_1:3000/clients')
    const clients: Client[] = response.data
    const client = clients.filter((client) => client.email == email)[0]
    return { token, user, client }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return { succes: { message: 'Logout complete' } }
  }
}
