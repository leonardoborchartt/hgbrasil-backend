const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

//Extended https://swagger.io/specification/#infoObject
const swaggerDefinition = {
  info: {
    title: 'Learning API',
    description: 'Learning API Information'
  }
}

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = (server) => server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
