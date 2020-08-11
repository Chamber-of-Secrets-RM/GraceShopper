const router = require('express').Router()
const {Chair} = require('../db/models')
module.exports = router

// move to a sepreate file and import as nessecary
const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user.user
  console.log('CurrentUser in isAdmin', currentUser)
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error(
      'You are not allowed to do this. The authorities have been notified.this is the current user =>',
      console.log(currentUser)
    )
    error.status = 401
    next(error)
  }
}

//  api/chair/ => Gets ALL chairs
router.get('/', async (req, res, next) => {
  try {
    const chairs = await Chair.findAll({})
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

// api/chairs/:chairId => Deletes chair from Chair model in db
router.delete('/:chairId', isAdminMiddleware, async (req, res, next) => {
  console.log('this is the req and res in delete route for CHARI :', req)
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
