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
  collection: 'bids'
}

const BidSchema = new Schema(fields, schemaOptions)

BidSchema.plugin(timestamps)

const Bid = mongoose.model('Bid', BidSchema)

export {
  Bid,
  BidSchema
}
