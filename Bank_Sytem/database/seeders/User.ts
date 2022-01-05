import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const admin = await User.create({
      email: 'albertoadmin@gmail.com',
      password: '1234',
      username: 'albertojcvs',
    })
    const adminPermission = await Permission.findByOrFail('name', 'admin')
    admin.related('permissions').attach([adminPermission.id])
  }
}
