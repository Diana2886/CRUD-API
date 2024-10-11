import http from 'node:http'
import { userRoutes } from './routes/userRoutes'
import { errorHandler } from './utils/errorHandler'
import 'dotenv/config'

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url?.startsWith('/api/users')) {
    userRoutes(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('error', (err) => errorHandler(err))
