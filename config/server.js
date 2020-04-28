const port = 3003
const Finance = require('./Finance')
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
var cron = require('node-cron')
const axios = require('axios')
const cors = require('cors')
const mongoose = require('mongoose')

const swagger = require('./swagger')
swagger(server)

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(express.json())
server.use(cors())

server.get('/', async (req, res) => {
  const finances = await Finance.find()
  return res.json(finances)
})

mongoose.connect('mongodb+srv://migrate:migrate@cluster0-caszl.mongodb.net/testenew?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })


cron.schedule('0 * * * *', () => {
  axios
    .get('https://api.hgbrasil.com/finance?format=json-cors&key=af04693c')
    .then(async res => {
      await Finance.create(res.data.results.currencies)
      console.log('Created currencies at ' + Date(Date.now().toString()))
    }).catch(function (error) {
      console.log(error)
    })
})


server.listen(process.env.PORT || port, () => {
  console.log(`Server is RUNNING on port: ${port}`)
})

module.exports = server
