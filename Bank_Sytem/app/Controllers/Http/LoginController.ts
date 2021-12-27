import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'

export default class LoginController {
  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    const token = await auth.use('api').attempt(email, password)

    const user = await User.query()
      .select('id','email', 'username')
      .where('email', email).preload('permissions').firstOrFail()

    return { token, user }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return { succes: { message: 'Logout complete' } }
  }
}
