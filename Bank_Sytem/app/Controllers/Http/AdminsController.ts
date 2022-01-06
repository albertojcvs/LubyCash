import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUSerValidator from 'App/Validators/UpdateUserValidator'

export default class AdminsController {
  public async index() {
    const adminPermission = await Permission.findByOrFail('name', 'admin')
    return await User.query()
      .select('users.id', 'username', 'email', 'users.created_at', 'users.updated_at')
      .join('user_permissions', (query) => {
        query
          .on('users.id', '=', 'user_permissions.user_id')
          .andOnVal('user_permissions.permission_id', '=', adminPermission.id.toString())
      })
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    return await User.query()
      .select('id', 'username', 'email', 'created_at', 'updated_at')
      .preload('permissions')
      .where('id', id)
      .firstOrFail()
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)

    const userPermission = await Permission.findByOrFail('name', 'user')
    const adminPermission = await Permission.findByOrFail('name', 'admin')

    const admin = await User.create(data)

    await admin.related('permissions').attach([userPermission.id, adminPermission.id])

    return await User.query()
      .select('id', 'username', 'email', 'created_at', 'updated_at')
      .preload('permissions')
      .where('id', admin.id)
      .firstOrFail()
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params

    const data = await request.validate(UpdateUSerValidator)
    const admin = await User.firstOrFail(id)

    Object.assign(admin, data)

    await admin.save()

    return await User.query()
      .select('id', 'username', 'email', 'created_at', 'updated_at')
      .preload('permissions')
      .where('id', admin.id)
      .firstOrFail()
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params
    const admin = await User.firstOrFail(id)
    await admin.delete()

    return { succes: { message: 'The admin was deleted!' } }
  }
}
