import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SaveUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.email(),
    ]),
    password: schema.string({ trim: true }, [rules.required(), rules.confirmed()]),
    usernmae: schema.string({ trim: true }, [rules.required()]),
  })

  public messages = {
    'required': "The {{ field }} is required to create a new user",
    'unique': ' The {{ field }} alrady exists',
  }
}
