import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    token: schema.string({trim:true}, [rules.required(), rules.exists({table:'users', column:'token'})]),
    password: schema.string({trim:true}, [rules.required(), rules.confirmed()])
  })

  public messages = {
    'passoword.confirmed':'The password confirmation is required',
    'required': 'The {{ field }} is required to reset the password',
    'token.exists': 'This token does not exists!'

  }
}
