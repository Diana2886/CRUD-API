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
import {
  invalidRoute,
  invalidUserData,
  invalidUserId,
  serverError,
  userNotFound
} from '../utils/errorHandler'

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const [_, _api, _resource, userId] = req.url?.split('/') || []

    if (req.method === 'GET' && req.url === '/api/users') {
      const users = getAllUsers()

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(users))
    } else if (req.method === 'GET') {
      if (!isUserIdValid(userId)) {
        return invalidUserId(res)
      }

      const user = getUserById(userId!)

      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(user))
      } else {
        return userNotFound(res)
      }
    } else if (req.method === 'POST' && req.url === '/api/users') {
      const body = await parseRequestBody(req)

      if (isPostBodyInvalid(body)) {
        return invalidUserData(res)
      }

      const newUser = createUser(body)

      res.writeHead(201, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(newUser))
    } else if (req.method === 'PUT') {
      if (!isUserIdValid(userId)) {
        return invalidUserId(res)
      }

      const user = getUserById(userId!)

      if (!user) {
        return userNotFound(res)
      }

      const body = await parseRequestBody(req)

      if (isPutBodyInvalid(body)) {
        return invalidUserData(res)
      }

      const updatedUser = updateUser(userId!, body)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(updatedUser))
    } else if (req.method === 'DELETE') {
      if (!isUserIdValid(userId)) {
        return invalidUserId(res)
      }

      const user = getUserById(userId!)

      if (!user) {
        return userNotFound(res)
      }

      deleteUser(userId!)

      res.writeHead(204)
      return res.end()
    } else {
      return invalidRoute(res)
    }
  } catch (error) {
    return serverError(
      error instanceof Error ? error : new Error(String(error)),
      res
    )
  }
}
