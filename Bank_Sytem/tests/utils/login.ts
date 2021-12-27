import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export async function login(email:string, password:string) {
  const { text } = await supertest(BASE_URL).post('/login').send({ email, password })

  const { token } = JSON.parse(text).token
  return token
}
