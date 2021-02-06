import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'

const Schema = mongoose.Schema

const fields = {
  userid: {
    type: Schema.Types.ObjectId
  },
  value: {
    type: Number,
    min: 0
  },
  blocked: {
    type: Boolean,
    default: false
  }
}

const schemaOptions = {
  collection: 'autobids'
}

const AutobidSchema = new Schema(fields, schemaOptions)

AutobidSchema.plugin(timestamps)

const Autobid = mongoose.model('Autobid', AutobidSchema)

export {
  Autobid,
  AutobidSchema
}
