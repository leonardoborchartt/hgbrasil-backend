const samplesRouter = require('./samples')

module.exports = (server) => {
  server.use('/samples', samplesRouter)
}
