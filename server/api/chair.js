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

router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const data = await Chair.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})
router.put('/:chairId', isAdminMiddleware, async (req, res, next) => {
  try {
    const chairInstance = await Chair.findByPk(req.params.chairId)
    const data = await chairInstance.update(req.body)
    console.log('WHAT IS MY DATA IN PUT', data)
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
router.delete('/:chairId', isAdminMiddleware, async (req, res, next) => {
  try {
    Chair.destroy({
      where: {
        id: req.params.chairId
      }
    })
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})
