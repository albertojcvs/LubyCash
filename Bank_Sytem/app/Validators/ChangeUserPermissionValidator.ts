import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangeUserPermissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number( [rules.required(), rules.exists({table:'users', column:'id'})]),
    permission_name: schema.string({trim:true}, [rules.required(), rules.exists({table:'permissions',column:'name'})])
  })

  public messages = {}
}
