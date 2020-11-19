import request from 'supertest'
import { app } from '../server'

describe('API routes', () => {
  test('routes', async () => {
    let response = await request(app).get('/api')
    expect(response.status).toBe(200)
  })
})