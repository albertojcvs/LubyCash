import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUSerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    username: schema.string({ trim: true }, [rules.required()]),
  })

  public messages = {
    'required': "The {{ field }} is required to update the user's data",
    'unique': ' The {{ field }} alrady exists',
    'email.email': 'The format of the email is not correct',
  }
}
