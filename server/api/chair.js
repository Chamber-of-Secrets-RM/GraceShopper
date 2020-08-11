const router = require('express').Router()
const {Chair, Tags} = require('../db/models')
const isAdminMiddleware = require('./adminMiddleware')

module.exports = router
// move to a sepreate file and import as nessecary

//  api/chair/ => Gets ALL chairs
router.get('/', async (req, res, next) => {
  try {
    const chairs = await Chair.findAll({
      include: {
        model: Tags
      }
    })
    res.json(chairs)
  } catch (err) {
    next(err)
  }
})

// api/chairs/:chair Id => Gets single chair by Id
router.get('/:chairId', async (req, res, next) => {
  try {
    const data = await Chair.findOne({
      where: {
        id: req.params.chairId
      },
      include: {
        model: Tags
      }
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

//  api/chairs/ => Creates new chair in Chair model
router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const data = await Chair.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

// api/chairs/:chairId => Update single chair with given parameters
router.put('/:chairId', isAdminMiddleware, async (req, res, next) => {
  try {
    const chairInstance = await Chair.findByPk(req.params.chairId)
    console.log('THis is the chairInst', chairInstance)
    const data = await chairInstance.update(req.body)
    console.log('🦆This is the req:', req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})
// router.delete('/:id', isAdminMiddleware, (req, res, next) => {
//   req.requestedChair
//     .destroy()
//     .then(() => {
//       res.status(204).end()
//     })
//     .catch(next)
// })

// api/chairs/:chairId => Deletes chair from Chair model in db
router.delete('/:chairId', isAdminMiddleware, async (req, res, next) => {
  try {
    Chair.destroy({
      where: {
        id: req.params.chairId
      }
    })
    res.status(204).send('Chair deleted')
  } catch (error) {
    next(error)
  }
})
