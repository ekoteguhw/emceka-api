const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MckSchema = new Schema({
  name: String,
  description: String,
  address: String,
  facilities: {
    room: {
      flush: {
        sum: Number
      },
      squat: {
        sum: Number
      },
      bath: {
        sum: Number,
        hasShower: Boolean
      }
    },
    hasTissue: Boolean,
    hasSoap: Boolean,
    hasTrash: Boolean,
    hasMirror: Boolean
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  images: [{ uri: String }],
  rating: { type: Number, default: 0 },
  reviews: [{
    userReview: Object,
    title: String,
    review: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }],
  userCreated: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Mck', MckSchema)
