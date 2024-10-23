import { IncomingMessage, ServerResponse } from 'http'
import { userRoutes } from './userRoutes'
import { invalidRoute } from '../utils/errorHandler'

export const mainRouter = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith('/api/users')) {
    userRoutes(req, res)
  } else {
    return invalidRoute(res)
  }
}
