import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import CreatePermissionValidator from 'App/Validators/CreatePermissionValidator'

export default class PermissionsController {
  public async index() {
    await Permission.all()
  }
  public async show({ params }: HttpContextContract) {
    const { id } = params

    const permission = await Permission.findOrFail(id)

    return permission
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreatePermissionValidator)

    const permission = await Permission.create(data)

    return permission
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const permission = await Permission.findOrFail(id)

    await permission.delete()

    return { succes: { message: 'The permission has been deleted' } }
  }
}
