import Permission from "App/Models/Permission"
import crypto from 'crypto'

function generateRandomName () {
  return crypto.randomBytes(6).toString('hex')
}

export async function createPermission(){
  const name = generateRandomName()

  const permission = await Permission.create({name})

  return permission
}
