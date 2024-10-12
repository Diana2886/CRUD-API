import { users } from '../models/userModel'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../shared/userInterface'

export const getAllUsers = () => users

export const getUserById = (userId: string) =>
  users.find((user) => user.id === userId)

export const createUser = (body: Omit<User, 'id'>) => {
  const newUser = {
    id: uuidv4(),
    username: body.username,
    age: body.age,
    hobbies: body.hobbies || []
  }

  users.push(newUser)
  return newUser
}

export const updateUser = (userId: string, body: Omit<User, 'id'>) => {
  users.forEach((user, index) => {
    if (user.id === userId) {
      users[index] = { ...user, ...body }
    }
  })

  return getUserById(userId)
}

export const deleteUser = (userId: string) => {
  users.forEach((user, index) => {
    if (user.id === userId) {
      users.splice(index, 1)
    }
  })
}
