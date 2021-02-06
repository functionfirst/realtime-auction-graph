import mongoose from 'mongoose'
import {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} from './env.js'

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

const options = {
  autoIndex: true,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  poolSize: 50,
  bufferMaxEntries: 0,
  keepAlive: 120,
  useNewUrlParser: true
}

const connection = mongoose.connect(uri, options)
  .then(connect => {
    console.log('MongoDB is connected')
    return connect
  }).catch(err => {
    console.log(err)
  })

export {
  connection
}
