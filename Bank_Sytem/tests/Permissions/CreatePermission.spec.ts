import test from 'japa'
import supertest from 'supertest'
import { createUser } from '../utils/createUser'
import { login } from '../utils/login'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const supertestWithUrl = supertest(BASE_URL)

test.group('Create a permission', () => {
  test('It should be able to create a new permission', async (assert) => {
    const { user, password } = await createUser(true)
    const token = await login(user.email, password)
    const name = 'fakePermission'
    const { text, statusCode } = await supertestWithUrl
      .post('/permissions')
      .send({ name })
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

    const newPermission = JSON.parse(text)

    assert.equal(statusCode,200)
    assert.equal(newPermission.name,name)

    await user.delete()
  })

  test('It should not be able to create a permission without a name', async (assert) => {
    const { user, password } = await createUser(true)
    const token = await login(user.email, password)
    const { text, statusCode } = await supertestWithUrl
      .post('/permissions')
      .send({ })
      .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })


    assert.equal(statusCode, 422)
    assert.hasAnyKeys(JSON.parse(text), ['error'])
    await user.delete()
    })

    test('It should not be able to create a permission that already exists', async (assert) => {
      const { user, password } = await createUser(true)
      const token = await login(user.email, password)
      const name = 'fakePermission'

      await supertestWithUrl
        .post('/permissions')
        .send({ name })
        .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

      const { text, statusCode } = await supertestWithUrl
        .post('/permissions')
        .send({ name })
        .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

      assert.equal(statusCode, 422)
      assert.hasAnyKeys(JSON.parse(text), ['error'])
      })

      test('It should not be able to create a new permission without a admin permission', async (assert) => {
        const { user, password } = await createUser()
        const token = await login(user.email, password)
        const name = 'fakePermission'
        const { text, statusCode } = await supertestWithUrl
          .post('/permissions')
          .send({ name })
          .set({ authorization: `Bearer ${token}`, accpet: 'application/json' })

        assert.equal(statusCode,403)
        assert.hasAnyKeys(JSON.parse(text),['error'] )

        await user.delete()
      })
      test('It should not be able to create a new permission without authentication', async (assert) => {
        const { user } = await createUser()
        const name = 'fakePermission'
        const { text, statusCode } = await supertestWithUrl
          .post('/permissions')
          .send({ name })
          .set({ accpet: 'application/json' })

        assert.equal(statusCode,401)
        assert.hasAnyKeys(JSON.parse(text),['error'] )

        await user.delete()
      })
})
