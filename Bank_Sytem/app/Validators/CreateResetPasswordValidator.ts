import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.exists({
        table: 'users',
        column: 'email',
      }),
    ]),
    link: schema.string.optional({ trim: true}, [rules.url()])
  })

  public messages = {
    'required': 'The {{ field }} is required to reset the password',
    'email.exists': 'The email does not exist',
    'email': 'The format of the email is invalid!',
    'url': 'the url format is invalid!',
  }
}
