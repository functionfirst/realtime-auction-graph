import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const Schema = mongoose.Schema

const fields = {
  name: {
    type: String,
    trim: true,
    required: [true, 'User name is required']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: [true, 'User email is required'],
    index: {
      unique: true,
    }
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    select: false
  },
  admin: {
    type: Boolean,
    default: false
  },
  blocked: {
    type: Boolean,
    default: true,
  }
}

const schemaOptions = {
  collection: 'users'
}

const UserSchema = new Schema(fields, schemaOptions)

UserSchema.plugin(timestamps)

UserSchema.index({
  createdAt: 1,
  updatedAt: 1,
  email: 1
})

// @todo determine fields to remove based on permissions at some point?
const userTypeComposerOptions = {
  removeFields: ['createdAt', 'updatedAt']
}

const User = mongoose.model('User', UserSchema)
const UserTC = composeWithMongoose(User, userTypeComposerOptions)

export {
  User,
  UserSchema,
  UserTC
}
