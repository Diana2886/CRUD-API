import { IncomingMessage } from 'http'
import { validate as uuidValidate } from 'uuid'
import { User } from '../shared/userInterface'

export const isUserIdValid = (id: string | undefined) => {
  if (!id || !uuidValidate(id)) {
    return false
  }
  return true
}

export const parseRequestBody = async (req: IncomingMessage) => {
  return new Promise<User>((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      resolve(JSON.parse(body))
    })
    req.on('error', (err) => {
      reject(err)
    })
  })
}

export const isPostBodyInvalid = (user: User) => {
  return (
    !user.username ||
    typeof user.username !== 'string' ||
    !user.age ||
    typeof user.age !== 'number' ||
    !Array.isArray(user.hobbies) ||
    !user.hobbies.every((hobby) => typeof hobby === 'string')
  )
}

export const isPutBodyInvalid = (user: Partial<User>) => {
  return (
    (user.username !== undefined &&
      (typeof user.username !== 'string' || user.username.trim() === '')) ||
    (user.age !== undefined && typeof user.age !== 'number') ||
    (user.hobbies !== undefined &&
      (!Array.isArray(user.hobbies) ||
        !user.hobbies.every((hobby) => typeof hobby === 'string')))
  )
}
