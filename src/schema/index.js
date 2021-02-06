import { SchemaComposer } from 'graphql-compose'
import { UserQuery, UserMutation } from './user.js'
import { AuctionQuery, AuctionSubscription, AuctionMutation } from './auction.js'

const schemaComposer = new SchemaComposer()

schemaComposer.Query.addFields({ ...UserQuery, ...AuctionQuery })

schemaComposer.Subscription.addFields({ ...AuctionSubscription })

schemaComposer.Mutation.addFields({ ...UserMutation, ...AuctionMutation })

const schema = schemaComposer.buildSchema()

export {
  schema
}
