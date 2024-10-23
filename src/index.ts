import http from 'node:http'
import { mainRouter } from './routes/mainRouter'
import 'dotenv/config'

const PORT = process.env.PORT || 3000

const server = http.createServer(mainRouter)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('error', (err) => console.error(err))

export default server
