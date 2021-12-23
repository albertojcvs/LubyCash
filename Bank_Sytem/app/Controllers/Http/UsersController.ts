import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUSerValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return await User.query().select('email', 'username')
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    return await User.query().select('email', 'username').where('id', id)
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)

    const user = await User.create(data)

    const userPermission = await Permission.findByOrFail('name', 'user')

    await user.related('permissions').attach[userPermission.id]

    return  User.query().select('email', 'username').where('id', user.id)
  }

  public async update({ params,request }: HttpContextContract) {
    const data = request.validate(UpdateUSerValidator)

    const { id } = params

    const user = await User.findOrFail(id)

    Object.assign(user, data)

    await user.save();

    return User.query().select('email', 'username').where('id', user.id)

  }

  public async destroy({params}: HttpContextContract) {

    const { id } = params
    const user = await User.findOrFail(id)

    await user.delete()
    return {succes:{
      message: 'The user has been deleted'
    }}
  }
}
