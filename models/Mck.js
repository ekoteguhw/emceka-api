const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MckSchema = new Schema({
  name: String,
  description: String,
  address: String,
  facilities: {
    room: {
      flush: {
        sum: { type: Number, default: 0 }
      },
      squat: {
        sum: { type: Number, default: 0 }
      },
      bath: {
        sum: { type: Number, default: 0 },
        hasShower: { type: Boolean, default: false }
      }
    },
    hasTissue: { type: Boolean, default: false },
    hasSoap: { type: Boolean, default: false },
    hasTrash: { type: Boolean, default: false },
    hasMirror: { type: Boolean, default: false }
  },
  location: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  },
  images: [{ uri: String }],
  reviews: [{
    userReview: {
      userId: String,
      name: String
    },
    title: String,
    review: String,
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }],
  userCreated: {
    userId: String,
    name: String,
    avatar: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Mck', MckSchema)
