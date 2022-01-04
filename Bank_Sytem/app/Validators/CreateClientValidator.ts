import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fullname: schema.string({ trim: true }, [rules.required()]),
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.exists({ table: 'users', column: 'email' }),
      rules.email(),
    ]),
    cpf: schema.string({ trim: true }, [rules.required()]),
    phoneNumber: schema.string({ trim: true }, [rules.required()]),
    address: schema.string({ trim: true }, [rules.required()]),
    city: schema.string({ trim: true }, [rules.required()]),
    state: schema.string({ trim: true }, [rules.required()]),
    zipcode: schema.string({ trim: true }, [rules.required()]),
    averageSalary: schema.number([rules.required(), rules.unsigned()]),
  })
  public messages = {}
}
