import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateResetPasswordValidator from 'App/Validators/CreateResetPasswordValidator'
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'
import crypto from 'crypto'
import { DateTime } from 'luxon'
export default class ResetPasswordsController {
  public async store({ request }: HttpContextContract) {
    const { email, link } = await request.validate(CreateResetPasswordValidator)

    const user = await User.findByOrFail('email', email)

    user.token = crypto.randomBytes(10).toString('hex')
    user.token_created_at = DateTime.now()

    await user.save()

    await Mail.sendLater((message) => {
      message
        .from('lubyCash@lubycash.com')
        .to(user.email)
        .subject('Reset your password!')
        .htmlView('emails/reset_password', {
          username: user.username,
          token: user.token,
          link: link ? link + user.token : null,
        })
    })

    return { succes: { message: 'The email with the token was sent!' } }
  }

  public async update({ request }: HttpContextContract) {
    const { token, password } = await request.validate(ResetPasswordValidator)

    const user = await User.findByOrFail('token', token)

    user.password = password
    user.$setAttribute('token', null)
    user.$setAttribute('token_created_at', null)

    await user.save()

    await Mail.sendLater((message) => {
      message
        .to(user.email)
        .from('lubycash@lubycash.com')
        .subject('Your password was reseted!')
        .htmlView('emails/password_reseted', { username: user.username })
    })

    return { succes: { message: 'The password was reseted!' } }
  }
}
