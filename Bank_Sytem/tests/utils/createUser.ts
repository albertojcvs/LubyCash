import Permission from 'App/Models/Permission'
import User from 'App/Models/User'
import crypto from 'crypto'
function generateRandomEmail() {
  return `${crypto.randomBytes(5).toString('hex')}@${crypto.randomBytes(5).toString('hex')}.com`
}
export async function createUser(isAdmin = false) {
  const password = '1234'
  const email = generateRandomEmail()
  const user = await User.create({ email, password, username: 'fake' })

  if (isAdmin) {
    const adminPermission = await Permission.findByOrFail('name', 'admin')
    await user.related('permissions').attach([adminPermission.id])
  }

  return { user, password }
}
