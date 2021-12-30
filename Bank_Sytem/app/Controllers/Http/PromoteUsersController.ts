import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ChangePromoteUser from 'App/Validators/ChangeUserPermissionValidator'

export default class PromoteUsersController {
  public async promoteUser({ request }: HttpContextContract) {
    const { user_id, permission_name } = await request.validate(ChangePromoteUser)

    const user = await User.findOrFail(user_id)
    const permission = await User.findByOrFail('name', permission_name)

    await user.related('permissions').attach([permission.id])

    return {
      succes: {
        message: 'User was promoted',
      },
    }
  }

  public async removePromotion({ request }: HttpContextContract) {
    const { user_id, permission_name } = await request.validate(ChangePromoteUser)

    const user = await User.findOrFail(user_id)
    const permission = await User.findByOrFail('name', permission_name)

    await user.related('permissions').attach([permission.id])

    return {
      succes: {
        message: 'Promotion was removed',
      },
    }
  }
}
