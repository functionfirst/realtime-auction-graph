import { AuctionTC } from '../models/auction.js'

const AuctionQuery = {
  auctionById: AuctionTC.getResolver('findById'),
  auctionByIds: AuctionTC.getResolver('findByIds'),
  auctionOne: AuctionTC.getResolver('findOne'),
  auctionMany: AuctionTC.getResolver('findMany'),
  auctionCount: AuctionTC.getResolver('count'),
  auctionConnection: AuctionTC.getResolver('connection'),
  auctionPagination: AuctionTC.getResolver('pagination')
}

const AuctionSubscription = {
  auctionMany: AuctionTC.getResolver('findMany')
}

const AuctionMutation = {
  auctionCreateOne: AuctionTC.getResolver('createOne'),
  auctionCreateMany: AuctionTC.getResolver('createMany'),
  auctionUpdateById: AuctionTC.getResolver('updateById'),
  auctionUpdateOne: AuctionTC.getResolver('updateOne'),
  auctionUpdateMany: AuctionTC.getResolver('updateMany'),
  auctionRemoveById: AuctionTC.getResolver('removeById'),
  auctionRemoveOne: AuctionTC.getResolver('removeOne'),
  auctionRemoveMany: AuctionTC.getResolver('removeMany')
}

export {
  AuctionQuery,
  AuctionSubscription,
  AuctionMutation
}
