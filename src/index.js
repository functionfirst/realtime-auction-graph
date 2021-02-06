import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema/index.js'
import { PORT, IS_DEVELOPMENT }  from './utils/env.js'
import { connection } from './utils/db.js'

const port = PORT || 8080

const app = express()

const server = new ApolloServer({
  schema,
  cors: true,
  playground: IS_DEVELOPMENT,
  introspection: true,
  tracing: true,
  path: '/'
})

const onHealthCheck = () => {
  return new Promise((resolve, reject) => {
    if (connection.readyState > 0) {
      resolve()
    } else {
      reject()
    }
  })
}

server.applyMiddleware({
  app,
  path: '/',
  cors: true,
  onHealthCheck
})

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`)
})
