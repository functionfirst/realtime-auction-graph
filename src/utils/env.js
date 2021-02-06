import dotenv from 'dotenv'

dotenv.config()

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  PORT
} = process.env

export {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  PORT
}