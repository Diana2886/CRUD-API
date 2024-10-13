import { IncomingMessage, ServerResponse } from 'http'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController'
import {
  isPostBodyInvalid,
  isPutBodyInvalid,
  isUserIdValid,
  parseRequestBody
} from '../utils/helpers'

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url?.split('/')
  const userId = urlParts && urlParts[3]

  if (req.method === 'GET' && req.url === '/api/users') {
    const users = getAllUsers()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(users))
  } else if (req.method === 'GET') {
    if (!isUserIdValid(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Invalid user ID' }))
    }

    const user = getUserById(userId!)

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(user))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'User not found' }))
    }
  } else if (req.method === 'POST' && req.url === '/api/users') {
    const body = await parseRequestBody(req)

    if (isPostBodyInvalid(body)) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Invalid user data' }))
    }

    const newUser = createUser(body)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newUser))
  } else if (req.method === 'PUT') {
    if (!isUserIdValid(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Invalid user ID' }))
    }

    const user = getUserById(userId!)

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'User not found' }))
    }

    const body = await parseRequestBody(req)

    if (isPutBodyInvalid(body)) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Invalid user data' }))
    }

    const updatedUser = updateUser(userId!, body)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(updatedUser))
  } else if (req.method === 'DELETE') {
    if (!isUserIdValid(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Invalid user ID' }))
    }

    const user = getUserById(userId!)

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'User not found' }))
    }

    deleteUser(userId!)

    res.writeHead(204)
    return res.end()
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  return res.end(JSON.stringify({ message: 'Invalid route or method' }))
}
