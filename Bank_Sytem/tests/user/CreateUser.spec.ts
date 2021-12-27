import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Create a new user', () => {
  test('It should be able to create a user', async (assert) => {
    const fakeData = { email: 'fake@fake.com', password: '1234', username: 'fake' }
    const { text, statusCode } = await supertest(BASE_URL).post('/users').send({
      email: fakeData.email,
      password: fakeData.password,
      password_confirmation: fakeData.password,
      username: fakeData.username,
    })

    const user = JSON.parse(text)

    assert.equal(statusCode, 200)
    assert.equal(user.email, fakeData.email)
    assert.equal(user.username, fakeData.username)
    await User.query().delete().where('id', user.id)
  })

  test('It should not be able to create a new user with a email that already exists', async (assert) => {
    const fakeData = { email: 'fake@fake.com', password: '1234', username: 'fake' }
    await supertest(BASE_URL).post('/users').send({
      email: fakeData.email,
      password: fakeData.password,
      password_confirmation: fakeData.password,
      username: fakeData.username,
    })

    const { text, statusCode } = await supertest(BASE_URL).post('/users').send({
      email: fakeData.email,
      password: fakeData.password,
      password_confirmation: fakeData.password,
      username: fakeData.username,
    })

    const response = JSON.parse(text)

    assert.equal(statusCode, 422)
    assert.hasAllKeys(response,['error'])

    await User.query().delete().where('email', fakeData.email)
  })

  test('It should not be able to create a user without required informations', async (assert) => {
    const fakeData = { email: 'fake@fake.com', password: '1234', username: 'fake' }
    const responseOfWithoutEmail = await supertest(BASE_URL).post('/users').send({
      password: fakeData.password,
      password_confirmation: fakeData.password,
      username: fakeData.username,
    })

    const responseOfWithoutPassword = await supertest(BASE_URL).post('/users').send({
      email: fakeData.email,
      password_confirmation: '',
      username: fakeData.username,
    })
    const responseOfWithoutPasswordConfirmation = await supertest(BASE_URL).post('/users').send({
      email: fakeData.email,
      password: fakeData.password,
      username: fakeData.username,
    })

    const responseOfWithoutUsername = await supertest(BASE_URL).post('/users').send({
      email: fakeData.email,
      password: fakeData.password,
      password_confirmation: fakeData.password,
    })

    assert.equal(responseOfWithoutEmail.statusCode,422)
    assert.equal(responseOfWithoutPassword.statusCode,422)
    assert.equal(responseOfWithoutPasswordConfirmation.statusCode,422)
    assert.equal(responseOfWithoutUsername.statusCode,422)

  })

  test('It should be able to hash the password when create a new user', async (assert) => {
    const fakeData = { email: 'fake@fake.com', password: '1234', username: 'fake' }
    const { text, statusCode } = await supertest(BASE_URL).post('/users').send({
      email: fakeData.email,
      password: fakeData.password,
      password_confirmation: fakeData.password,
      username: fakeData.username,
    })

    const responseData = JSON.parse(text)
    const user = await User.findOrFail(responseData.id)
    assert.equal(statusCode, 200)
    assert.notEqual(user.password, fakeData.password)
    await user.delete()
  })
})
