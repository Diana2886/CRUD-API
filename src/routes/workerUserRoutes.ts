import { IncomingMessage, ServerResponse } from 'http'
import { isPostBodyInvalid, parseRequestBody } from '../utils/helpers'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../shared/userInterface'
import {
  invalidRoute,
  invalidUserData,
  invalidUserId,
  userNotFound
} from '../utils/errorHandler'

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url?.split('/')
  const userId = urlParts && urlParts[3]

  if (req.method === 'GET' && req.url === '/api/users') {
    process.send!({ action: 'getAllUsers' })
    process.on('message', (message: { action: string; users: User[] }) => {
      if (message.action === 'responseUsers') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(message.users))
      }
    })
  } else if (req.method === 'GET') {
    process.send!({ action: 'getUserById', userId })

    process.once(
      'message',
      (message: { action: string; user: User | undefined }) => {
        if (message.action === 'invalidUserId') {
          return invalidUserId(res)
        }
        if (message.action === 'responseUser') {
          if (message.user) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(message.user))
          } else {
            return userNotFound(res)
          }
        }
      }
    )
  } else if (req.method === 'POST' && req.url === '/api/users') {
    const body = await parseRequestBody(req)

    const newUserId = uuidv4()

    process.send!({ action: 'createUser', userId: newUserId, body })

    process.once('message', (message: { action: string; user: User }) => {
      if (message.action === 'responseUserCreated') {
        if (isPostBodyInvalid(message.user)) {
          return invalidUserData(res)
        }
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(message.user))
      }
    })
  } else if (req.method === 'PUT') {
    const body = await parseRequestBody(req)

    process.send!({ action: 'updateUser', userId, body })

    process.once(
      'message',
      (message: { action: string; user: User | undefined }) => {
        if (message.action === 'invalidUserId') {
          return invalidUserId(res)
        }
        if (message.action === 'userNotFound') {
          return userNotFound(res)
        }
        if (message.action === 'responseUserUpdated') {
          console.log('message', message)
          if (message.user) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(message.user))
          }
        }
      }
    )
  } else if (req.method === 'DELETE') {
    process.send!({ action: 'deleteUser', userId })

    process.once(
      'message',
      (message: { action: string; user: User | undefined }) => {
        if (message.action === 'invalidUserId') {
          return invalidUserId(res)
        }
        if (message.action === 'responseUserDeleted') {
          if (message.user) {
            res.writeHead(204)
            return res.end()
          } else {
            return userNotFound(res)
          }
        }
      }
    )
  } else {
    return invalidRoute(res)
  }
}
