const router = require('express').Router()
const {Chair} = require('../db/models')
module.exports = router

const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.session.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error(
      'You are not allowed to do this the authorities have been notified'
    )
    error.status = 401
    next(error)
  }
}

router.get('/', async (req, res, next) => {
  try {
    const chairs = await Chair.findAll({})
    res.json(chairs)
  } catch (err) {
    next(err)
  }
})
router.get('/:chairId', async (req, res, next) => {
  try {
    const data = await Cart.findOne({
      where: {
        id: req.params.chairId
      }
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdminMiddleware, (req, res, next) => {
  Chair.create(req.body)
    .then(chair => {
      res.status(201).json(chair)
    })
    .catch(next)
})
router.delete('/:id', isAdminMiddleware, (req, res, next) => {
  req.requestedChair
    .destroy()
    .then(() => {
      res.status(204).end()
    })
    .catch(next)
})
