import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`


test.group('Create a new user', () => {
  test('It should be able to create a user', async (assert) => {
  const fakeData  = { email:'fake@fake.com',
  password:'1234',}
    const {text,statusCode} =  await supertest(BASE_URL).post('/users').send({
      email: fakeData.email,
      password:fakeData.password,
      password_confirmation:fakeData.password
    })

    const user = JSON.parse(text)

    assert.equal(statusCode, 200)
  })
})
