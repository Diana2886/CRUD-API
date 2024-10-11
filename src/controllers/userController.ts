import { IncomingMessage, ServerResponse } from 'http'
import { users } from '../models/userModel'
import {
  isUserIdValid,
  parseRequestBody,
  isBodyInvalid
} from '../utils/helpers'
import { v4 as uuidv4 } from 'uuid'

export const getAllUsers = (_: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(users))
}

export const getUserById = (
  _: IncomingMessage,
  res: ServerResponse,
  userId: string | undefined
) => {
  if (!isUserIdValid(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Invalid user ID' }))
  }

  const user = users.find((user) => user.id === userId)

  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(user))
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'User not found' }))
  }
}

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  const body = await parseRequestBody(req)

  if (isBodyInvalid(body)) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Invalid user data' }))
  }

  const newUser = {
    id: uuidv4(),
    username: body.username,
    age: body.age,
    hobbies: body.hobbies || []
  }

  users.push(newUser)

  res.writeHead(201, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(newUser))
}

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string | undefined
) => {
  const userIndex = users.findIndex((user) => user.id === userId)
  if (!isUserIdValid(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Invalid user ID' }))
  }

  if (userIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'User not found' }))
  }

  const body = await parseRequestBody(req)

  if (isBodyInvalid(body)) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Invalid user data' }))
  }

  users[userIndex] = { ...users[userIndex], ...body }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(users[userIndex]))
}

export const deleteUser = (
  _: IncomingMessage,
  res: ServerResponse,
  userId: string | undefined
) => {
  if (!isUserIdValid(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Invalid user ID' }))
  }

  const userIndex = users.findIndex((user) => user.id === userId)
  if (userIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'User not found' }))
  }

  users.splice(userIndex, 1)
  res.writeHead(204)
  res.end()
}
