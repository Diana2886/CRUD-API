import http from 'node:http'
import { userRoutes } from './routes/workerUserRoutes'
import cluster from 'node:cluster'
import os from 'node:os'
import 'dotenv/config'
import { isUserIdValid } from './utils/helpers'
import { User } from './shared/userInterface'

const PORT = Number(process.env.PORT) || 4000
const numWorkers = os.availableParallelism() - 1
let server: http.Server

let users: User[] = []

if (cluster.isPrimary) {
  let currentWorker = 0

  console.log(`Primary process ${process.pid} is running`)

  for (let i = 0; i < numWorkers; i++) {
    const worker = cluster.fork({ WORKER_PORT: PORT + i + 1 })

    worker.on('message', (message) => {
      const { action, userId, body } = message

      if (!isUserIdValid(userId)) {
        worker.send({ action: 'invalidUserId' })
      }

      switch (action) {
        case 'getAllUsers':
          worker.send({ action: 'responseUsers', users })
          break
        case 'getUserById':
          const user = users.find((user) => user.id === userId)
          worker.send({ action: 'responseUser', user })
          break
        case 'createUser':
          const newUser = { id: userId, ...body }
          users.push(newUser)
          worker.send({ action: 'responseUserCreated', user: newUser })
          break
        case 'updateUser':
          const updatedUserIndex = users.findIndex((user) => user.id === userId)
          if (updatedUserIndex !== -1) {
            users[updatedUserIndex] = { ...users[updatedUserIndex], ...body }
            worker.send({
              action: 'responseUserUpdated',
              user: users[updatedUserIndex]
            })
          } else {
            worker.send({ action: 'userNotFound' })
          }
          break
        case 'deleteUser':
          const userForDeletion = users.find((user) => user.id === userId)
          users = users.filter((user) => user.id !== userId)
          worker.send({ action: 'responseUserDeleted', user: userForDeletion })
          break
        default:
          break
      }
    })
  }

  server = http.createServer((req, res) => {
    const workerPort = PORT + (currentWorker % numWorkers) + 1
    currentWorker += 1

    const proxy = http.request(
      {
        hostname: 'localhost',
        port: workerPort,
        path: req.url,
        method: req.method,
        headers: req.headers
      },
      (workerRes) => {
        res.writeHead(workerRes.statusCode!, workerRes.headers)
        workerRes.pipe(res)
      }
    )

    req.pipe(proxy)
  })

  server.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`)
  })
} else {
  const WORKER_PORT = PORT + (cluster.worker?.id ?? 0)

  server = http.createServer((req, res) => {
    console.log(
      `Worker ${process.pid} is handling the request on port ${WORKER_PORT}`
    )

    userRoutes(req, res)
  })

  server.listen(WORKER_PORT, () => {
    console.log(`Worker ${process.pid} is listening on port ${WORKER_PORT}`)
  })

  server.on('error', (err) => console.error(err))
}

export default server
