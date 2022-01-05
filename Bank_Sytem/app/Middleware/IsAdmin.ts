import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class IsAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const id = await auth.user?.id

    if (id) {
      const user = await User.findOrFail(id)
      console.log(auth.user);

      await user.load('permissions')
      const hasAdminPermission = user.permissions.some((permission) => permission.name === 'admin')

      if (hasAdminPermission) await next()
      else
        return response
          .status(403)
          .send({ error: { message: 'Only authenticated admins can use this route' } })
    } else
      return response
        .status(403)
        .send({ error: { message: 'Only authenticated admins can use this route' } })
  }
}
