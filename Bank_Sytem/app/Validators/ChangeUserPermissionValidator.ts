import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangeUserPermissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string({trim:true}, [rules.required(), rules.exists({column:'users', table:'id'})]),
    permission_name: schema.string({trim:true}, [rules.required(), rules.exists({table:'permission',column:'name'})])
  })

  public messages = {}
}
