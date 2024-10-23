import request from 'supertest'
import server from '../index'

describe('User API Tests', () => {
  let userId: string

  afterAll(() => {
    server.close()
  })

  it('should return an empty array when no users exist with GET api/users', async () => {
    const response = await request(server).get('/api/users')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
    expect(response.headers['content-type']).toMatch(/json/)
  })

  it('should create a new user with POST /api/users', async () => {
    const newUser = {
      username: 'John Doe',
      age: 30,
      hobbies: ['dancing', 'reading']
    }

    const response = await request(server)
      .post('/api/users')
      .send(newUser)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')

    userId = response.body.id

    expect(response.body).toMatchObject(newUser)
  })

  it('should get the created user with GET /api/users/{userId}', async () => {
    const response = await request(server)
      .get(`/api/users/${userId}`)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id', userId)
    expect(response.body.username).toBe('John Doe')
  })

  it('should update the user with PUT /api/users/{userId}', async () => {
    const updatedUser = {
      username: 'Jane Doe',
      age: 28
    }

    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUser)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id', userId)
    expect(response.body).toMatchObject(updatedUser)
  })

  it('should delete the user with DELETE /api/users/{userId}', async () => {
    const response = await request(server)
      .delete(`/api/users/${userId}`)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(204)
  })

  it('should return 404 for a deleted user with GET /api/users/{userId}', async () => {
    const response = await request(server)
      .get(`/api/users/${userId}`)
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'User not found' })
  })
})
