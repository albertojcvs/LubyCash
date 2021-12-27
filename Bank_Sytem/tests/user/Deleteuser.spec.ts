import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'
import { createUser } from '../utils/createUser'
import { login } from '../utils/login'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const supertestUrl = supertest(BASE_URL)
test.group('Delete a user', () => {
  test('It should be able to delete a user', async (assert) => {
    const { user, password } = await createUser()

    const token = await login(user.email, password)

    const { statusCode } = await supertestUrl
      .del(`/users/${user.id}`)
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    const userDeleted = await User.find(user.id)
    assert.equal(statusCode, 200)
    assert.notExists(userDeleted)
    await user.delete()
  })
  test('It should not be able to delete a user without authentication', async (assert) => {
    const { user } = await createUser()
    const { text, statusCode } = await supertestUrl
      .del(`/users/${user.id}`)
      .set({ authorization: `Bearer`, accpet: 'application/json' })

    assert.equal(statusCode, 401)
    assert.hasAnyKeys(JSON.parse(text), ['error'])

    await user.delete()
  })

  test('It should not be able to delete a user who is not the logged user', async (assert) => {
    const { user: user_1, password } = await createUser()
    const { user: user_2 } = await createUser()
    const token = await login(user_1.email, password)
    const { text, statusCode } = await supertestUrl
      .del(`/users/${user_2.id}`)
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })
    assert.equal(statusCode, 401)
    assert.hasAnyKeys(JSON.parse(text), ['error'])

    await user_1.delete()
    await user_2.delete()
  })
})
