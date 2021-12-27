import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'
import { createUser } from '../utils/createUser'
import { login } from '../utils/login'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const supertestUrl = supertest(BASE_URL)
test.group('Update a user', () => {
  test('It should be able to update a user', async (assert) => {
    const { user, password } = await createUser()
    const token = await login(user.email, password)
    const fakeData = { email: 'fake@fake.com', username: 'fake novo' }
    const { statusCode } = await supertestUrl
      .put(`/users/${user.id}`)
      .send({
        email: fakeData.email,
        username: fakeData.username,
      })
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    const userUpdated = await User.findOrFail(user.id)
    assert.equal(statusCode, 200)
    assert.equal(userUpdated.email, fakeData.email)
    assert.equal(userUpdated.username, fakeData.username)
    await user.delete()
  })

  test('It should not be able to update a user who is not authenticaded', async (assert) => {
    const { user } = await createUser()

    const fakeData = { email: 'fake@fake.com', username: 'fake novo' }
    const { text, statusCode } = await supertestUrl
      .put(`/users/${user.id}`)
      .send({
        email: fakeData.email,
        username: fakeData.username,
      })
      .set({ authorization: `Bearer`, accpet: 'application/json' })

    assert.equal(statusCode, 401)
    assert.hasAnyKeys(JSON.parse(text), ['error'])

    await user.delete()
  })

  test('It shoudl not be able to update the attributes of a user who is the logged user', async (assert) => {
    const { user: user_1, password } = await createUser()
    const { user: user_2 } = await createUser()

    const token = await login(user_1.email, password)

    const fakeData = { email: 'fake@fake.com', username: 'fake novo' }
    const { text, statusCode } = await supertestUrl
      .put(`/users/${user_2.id}`)
      .send({
        email: fakeData.email,
        username: fakeData.username,
      })
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    assert.equal(statusCode, 401)
    assert.hasAnyKeys(JSON.parse(text), ['error'])

    await user_1.delete()
    await user_2.delete()
  })
  test.only('It should not be able to update a user without a required attributes', async (assert) => {
    const { user, password } = await createUser()

    const token = await login(user.email, password)
    const fakeData = { email: 'fake@fake.com', username: 'fake novo' }

    const responseWithoutEmail = await supertestUrl
      .put(`/users/${user.id}`)
      .send({
        username: fakeData.username,
      })
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })


    const responseWithoutUsername = await supertestUrl
      .put(`/users/${user.id}`)
      .send({
        email: fakeData.email,
      })
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })
    assert.equal(responseWithoutEmail.statusCode, 422)
    assert.equal(responseWithoutUsername.statusCode, 422)

    await user.delete()
  })
})
