import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { comparePassword, hashPassword } from '../utils/password.js'
import { checkForUserErrors } from '../helpers/userHelper.js'

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

/**
 * Compare a given password with the database hash
 */
UserSchema.method('isPasswordValid', function (password) {
	return comparePassword(password, this.password)
})

/**
 * Authenticate the user by checking the account is not blocked
 * and that the password is correct
 */
UserSchema.method('authenticate', function (password) {
	if (this.blocked) {
		throw new Error('Authentication failed. Error 2.');
	}

	if (!this.isPasswordValid(password)) {
		throw new Error('Authentication failed. Error 3.')
	}
})

/**
 * Hashes the password before the user is saved
 */
UserSchema.pre('save', function (next) {
	try {
		if (this.isModified('password')) {
			this.password = hashPassword(this.password)
    }
	} catch (err) {
    console.log(err)
		// return next(err)
  }

	next()
})

UserSchema.post('save', function (error, doc, next) {
  checkForUserErrors(error)
  next(error)
})

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
