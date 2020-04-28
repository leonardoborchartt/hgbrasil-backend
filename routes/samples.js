const router = require('express').Router()
const samplesService = require('../samples/samplesService')

/**
 * @swagger
 * tags:
 *  name: Samples
 *  description: API usage samples
 */

/**
 * @swagger
 * definitions:
 *  Sample:
 *    required:
 *      - name
 *    properties:
 *      id:
 *        type: integer
 *      name:
 *        type: string
 *      description:
 *        type: string
 */

/**
 * @swagger
 * /samples:
 *  get:
 *    description: Get all Samples
 *    tags: [Samples]
 *    responses:
 *      '200':
 *        description: Samples list
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Sample'
 *
 */
router.get('/', (req, res) => {
  res.send(samplesService.getAll())
})

/**
 * @swagger
 * /samples/{id}:
 *  get:
 *    description: Get Sample by Id
 *    tags: [Samples]
 *    parameters:
 *      - name: id
 *        description: Sample Id
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      '200':
 *        description: Sample
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Sample'
 */
router.get('/:id', (req, res) => {
  res.send(samplesService.get(req.params.id))
})

/**
 * @swagger
 * /samples:
 *  post:
 *    description: Create new Sample
 *    tags: [Samples]
 *    parameters:
 *      - name: name
 *        description: Sample name
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        description: Sample description
 *        in: formData
 *        required: false
 *        type: string
 *    responses:
 *      '200':
 *        description: Sample created
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Sample'
 */
router.post('/', (req, res) => {
  const sample = samplesService.save({
    name: req.body.name,
    description: req.body.description
  })
  res.send(sample)
})

/**
 * @swagger
 * /samples/{id}:
 *  delete:
 *    description: Remove Sample by Id
 *    tags: [Samples]
 *    parameters:
 *      - name: id
 *        description: Sample Id
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      '200':
 *        description: Sample
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Sample'
 */
router.delete('/:id', (req, res) => {
  const sample = samplesService.remove(req.params.id)

  res.send(sample)
})

module.exports = router
