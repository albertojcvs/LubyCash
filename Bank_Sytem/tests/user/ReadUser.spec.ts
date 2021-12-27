import test from 'japa'
import supertest from 'supertest'
import { createUser } from '../utils/createUser'
import { login } from '../utils/login'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const supertestWithUrl = supertest(BASE_URL)
test.group('Read users', () => {
  test('It should be able to get all users', async (assert) => {
    const { user: user_1, password } = await createUser()
    const { user: user_2 } = await createUser()

    const token = await login(user_1.email, password)

    const { text, statusCode } = await supertestWithUrl
      .get('/users')
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    const users = JSON.parse(text)

    assert.equal(statusCode, 200)

    assert.isArray(users)

    await user_1.delete()
    await user_2.delete()
  })

  test('It shoudl be able to get a user', async (assert) => {
    const { user, password } = await createUser()

    const token = await login(user.email, password)

    const { text, statusCode } = await supertestWithUrl
      .get(`/users/${user.id}`)
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    const userResponse = JSON.parse(text)

    assert.equal(statusCode, 200)
    assert.equal(userResponse.email, user.email)

    await user.delete()
  })

  test('It should not be able to get a user without be authenticade', async (assert) => {
    const { user } = await createUser()

    const { text, statusCode } = await supertestWithUrl
      .get(`/users/${user.id}`)
      .set({ authorization: `Bearer`, accpet: 'application/json' })

    assert.equal(statusCode, 401)
    assert.hasAnyKeys(JSON.parse(text), ['error'])

    await user.delete()
  })

  test('It should not be able to get a user who does not exist', async (assert) => {
    const { user, password } = await createUser()

    const token = await login(user.email, password)

    const { text, statusCode } = await supertestWithUrl
      .get(`/users/${user.id+1}`)
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    assert.equal(statusCode, 404)
    assert.hasAnyKeys(JSON.parse(text), ['error'])

    await user.delete()
  })
})
