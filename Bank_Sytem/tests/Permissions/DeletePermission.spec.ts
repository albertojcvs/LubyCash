import Permission from 'App/Models/Permission'
import test from 'japa'
import supertest from 'supertest'
import { createPermission } from '../utils/createpermission'
import { createUser } from '../utils/createUser'
import { login } from '../utils/login'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const supertestWithUrl = supertest(BASE_URL)

test.group('Delete a permission', () => {
  test('It should be able to delete a permission', async (assert) => {
    const { user, password } = await createUser(true)
    const token = await login(user.email, password)

    const permission = await createPermission()

    const { text, statusCode } = await supertestWithUrl
      .delete(`/permissions/${permission.id}`)
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    assert.equal(statusCode, 200)
    assert.hasAnyKeys(JSON.parse(text), ['succes'])

    await user.delete()
    await permission.delete()
  })
  test('It should not be able to delete a permission without admin permission', async (assert) => {
    const { user, password } = await createUser()
    const token = await login(user.email, password)

    const permission = await createPermission()

    const { text, statusCode } = await supertestWithUrl
      .delete(`/permissions/${permission.id}`)
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    assert.equal(statusCode, 403)
    assert.hasAnyKeys(JSON.parse(text), ['error'])

    await user.delete()
    await permission.delete()
  })

  test('It should not be able to delete a permission without authentication', async (assert) => {
    const { user } = await createUser(true)

    const permission = await createPermission()

    const { text, statusCode } = await supertestWithUrl
      .delete(`/permissions/${permission.id}`)
      .set({ accpet: 'application/json' })

    assert.equal(statusCode, 401)
    assert.hasAnyKeys(JSON.parse(text), ['error'])

    await user.delete()
    await permission.delete()
  })

  test('It should not be able to delete a permission that does not exist', async (assert) => {
    const permissionsLength = (await Permission.all()).length

    const { user, password } = await createUser(true)
    const token = await login(user.email, password)


    const { text, statusCode } = await supertestWithUrl
      .delete(`/permissions/${permissionsLength + 1}`)
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    assert.equal(statusCode, 404)
    assert.hasAnyKeys(JSON.parse(text), ['error'])
    await user.delete()
  })
})
