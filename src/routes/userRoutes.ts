import { IncomingMessage, ServerResponse } from 'http'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController'

export const userRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url?.split('/')
  const userId = urlParts && urlParts[3]

  if (req.method === 'GET' && req.url === '/api/users') {
    return getAllUsers(req, res)
  } else if (req.method === 'GET') {
    return getUserById(req, res, userId)
  } else if (req.method === 'POST' && req.url === '/api/users') {
    return createUser(req, res)
  } else if (req.method === 'PUT') {
    return updateUser(req, res, userId!)
  } else if (req.method === 'DELETE') {
    return deleteUser(req, res, userId!)
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Invalid route or method' }))
}
