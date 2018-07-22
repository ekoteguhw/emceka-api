const hapi = require('hapi')
require('dotenv').config()
const mongoose = require('mongoose')
const Mck = require('./models/Mck')
const bcrypt = require('bcrypt')
const User = require('./models/User')

const server = hapi.Server({
  port: process.env.PORT || 3000,
  host: '0.0.0.0',
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Content-Type'],
      additionalHeaders: ['X-Requested-With']
    }
  }
})

console.log(`mongodb://${process.env.MCK_USER}:${process.env.MCK_PASSWORD}@${process.env.MCK_SERVER}:${process.env.MCK_PORT}/${process.env.MCK_DB}`)

mongoose.connect(`mongodb://${process.env.MCK_USER}:${process.env.MCK_PASSWORD}@${process.env.MCK_SERVER}:${process.env.MCK_PORT}/${process.env.MCK_DB}`, { useNewUrlParser: true })

mongoose.connection.once('open', () => {
  console.log('Database Connected')
})

const init = async () => {
  server.route([{
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      console.log('someone access this URL')
      return {
        name: 'EMCEKA API',
        version: '1.0.0'
      }
    }
  },
  {
    method: 'GET',
    path: '/mcks',
    handler: (req, res) => {
      console.log('someone access API get all mcks')
      return Mck.find()
    }
  }, {
    method: 'GET',
    path: '/mcks/get&id={id}',
    handler: (req, res) => {
      console.log('someone access API get mck by id')
      return Mck.findById(req.params.id)
    }
  }, {
    method: 'GET',
    path: '/mcks/search&q={q}',
    handler: (req, res) => {
      console.log('someone access API search by query')
      const mcks = Mck.find()
      return Mck.find({ name: { $regex: '.*' + req.params.q + '.*' } })
      //return mcks.filter(mck => mck.name.toLowerCase().includes(req.params.q)
    }
  }, {
    method: 'POST',
    path: '/mcks/nearest',
    handler: (req, res) => {
      const { latitude, longitude } = req.payload
      console.log('someone access API nearest location')
      //return mcks.find(mck => (mck.location.latitude == latitude && mck.location.longitude == longitude)
      return Mck.find({
        location: {
          latitude: latitude,
          longitude: longitude
        }
      })
    }
  }, {
    method: 'POST',
    path: '/mcks/create',
    handler: (req, res) => {
      const {
        name,
        description,
        address,
        facilities,
        location,
        images,
        reviews,
        userCreated
      } = req.payload

      const mck = new Mck({
        name,
        description,
        address,
        facilities,
        location,
        images,
        reviews,
        userCreated
      })

      console.log('someone access API posting a mck')
      return mck.save()
    }
  }, {
    method: 'POST',
    path: '/mcks/review&mck_id={mck_id}',
    handler: (req, res) => {

      const {
        title,
        review,
        userReview,
        rating
      } = req.payload

      const reviewCreated = {
        title,
        review,
        userReview,
        rating
      }

      console.log('someone access API posting a review of mck')
      return Mck.update({ _id: req.params.mck_id }, { $push: { reviews: reviewCreated } })
    }
  }, {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      console.log('someone access API get users')
      return User.find()
    }
  }, {
    method: 'GET',
    path: '/users/get&userId={userId}',
    handler: (req, res) => {
      console.log('someone access API get user by userId')
      return User.findOne({ userId: req.params.userId })
    }
  }, {
    method: 'POST',
    path: '/users/create',
    handler: (req, res) => {
      const {
        name,
        avatar,
        description,
        userId,
        email,
        password
      } = req.payload

      const passwordHash = bcrypt.hashSync(password, 10)
      const user = new User({
        name,
        avatar,
        description,
        userId,
        email,
        passwordHash
      })

      console.log('someone access API posting a user')
      return user.save()
    }
  }])

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
})

init()
