import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PixValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    toUserCpf: schema.string({trim:true}, [rules.required()]),
    value: schema.number([rules.required(), rules.unsigned()])
  })

  public messages = {
  }
}
