const hapi = require('hapi')
require('dotenv').config()
const mcks = require('./data/mcks')

const server = hapi.server({
  port: 4000,
  host: 'localhost'
})

const init = async () => {
  server.route([{
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      return `<h1>EMCEKA-API</h1>`
    }
  },
  {
    method: 'GET',
    path: '/mcks',
    handler: (req, res) => {
      return mcks
    }
  }, {
    method: 'GET',
    path: '/mcks/{id}',
    handler: (req, res) => {
      return mcks.filter(mck => mck.id == req.params.id)
    }
  }, {
    method: 'GET',
    path: '/mcks/search/{q}',
    handler: (req, res) => {
      return mcks.filter(mck => mck.name.toLowerCase().includes(req.params.q))
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
