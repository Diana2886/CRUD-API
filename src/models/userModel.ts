import { v4 as uuidv4 } from 'uuid'
import { User } from '../shared/userInterface'

export const users: User[] = [
  {
    id: uuidv4(),
    username: 'John Doe',
    age: 30,
    hobbies: ['reading', 'coding']
  },
  {
    id: uuidv4(),
    username: 'Jane Smith',
    age: 25,
    hobbies: ['painting', 'dancing']
  }
]
