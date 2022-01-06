import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUSerValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index() {
    const userPermission = await Permission.findByOrFail('name', 'user')
    return await User.query()
      .select('users.id', 'email', 'username', 'users.created_at', 'users.updated_at')
      .preload('permissions')
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    return await User.query()
      .select('id', 'email', 'username', 'created_at', 'updated_at')
      .where('id', id)
      .preload('permissions')
      .firstOrFail()
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)

    const user = await User.create(data)

    const userPermission = await Permission.findByOrFail('name', 'user')

    await user.related('permissions').attach([userPermission.id])

    return await User.query()
      .select('id', 'email', 'username', 'created_at', 'updated_at')
      .where('id', user.id)
      .firstOrFail()
  }

  public async update({ params, request, bouncer }: HttpContextContract) {
    const data = await request.validate(UpdateUSerValidator)

    const { id } = params

    const user = await User.findOrFail(id)

    await bouncer.authorize('updateUser', user)

    Object.assign(user, data)

    await user.save()

    return await User.query()
      .select('id', 'email', 'username', 'created_at', 'updated_at')
      .where('id', user.id)
      .firstOrFail()
  }

  public async destroy({ params, bouncer }: HttpContextContract) {
    const { id } = params
    const user = await User.findOrFail(id)

    await bouncer.authorize('deleteUser', user)

    await user.delete()
    return {
      succes: {
        message: 'The user has been deleted',
      },
    }
  }
}
