import { ServerResponse } from 'http'

export const serverError = (err: Error, res: ServerResponse) => {
  console.error('Error:', err.message)

  res.writeHead(500, { 'Content-Type': 'application/json' })
  return res.end(JSON.stringify({ message: 'Internal Server Error' }))
}

export const userNotFound = (res: ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' })
  return res.end(JSON.stringify({ message: 'User not found' }))
}

export const invalidRoute = (res: ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' })
  return res.end(JSON.stringify({ message: 'Invalid route' }))
}

export const invalidUserId = (res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' })
  return res.end(JSON.stringify({ message: 'Invalid user ID' }))
}

export const invalidUserData = (res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' })
  return res.end(JSON.stringify({ message: 'Invalid user data' }))
}
