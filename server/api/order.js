const router = require('express').Router()
const {Order, OrdersChairs} = require('../db/models')

module.exports = router

const isAdminOrProperUserMiddleware = (req, res, next) => {
  const currentUser = req.session.user
  // needs to be tested to see how to test for user//
  if (currentUser || currentUser.isAdmin) {
    next()
  } else {
    const error = new Error(
      'You are not allowed to do this the authorities have been notified'
    )
    error.status = 401
    next(error)
  }
}
router.get(
  // this route is for the initial population of cart when a user logs in
  '/:userId/',
  isAdminOrProperUserMiddleware,
  async (req, res, next) => {
    try {
      const [orders, orderCreated] = await Order.findOrCreate({
        where: {
          userId: req.params.userId,
          isFulfilled: 0 // 0 is unfulfilled, 1 is fulfilled
        }
      })
      res.json(orders)
    } catch (err) {
      next(err)
    }
  }
)

router.get(
  // order history route
  '/:userId/History/',
  isAdminOrProperUserMiddleware,
  async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        where: {
          userId: req.params.userId,
          isFulfilled: 1
        }
      })
      // check if admin or correct user //
      res.json(orders)
    } catch (err) {
      next(err)
    }
  }
)
///     /api/order/:orderId/chair/:chairId/quantity/:quantity
router.post(
  '/:orderId/chair/:chairId/quantity/:quantity',
  async (err, req, res, next) => {
    try {
      const userOrderInstance = await Orders.findAll({
        where: {
          userId: req.user.id,
          id: req.params.orderId
        }
      })
      if (!userOrderInstance) {
        err.message = 'this was a bad user'
        next(err) // needs to be tested, how are we going to throw custom error
      }
      const data = await OrdersChairs.update(
        {
          quantity: req.params.quantity
        },
        {
          where: {
            orderId: req.params.orderId,
            chairId: req.params.chairId
          }
        }
      )
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
)
router.delete('/:orderId/chair/:chairId/', async (req, res, next) => {
  try {
    const userOrderInstance = await Orders.findAll({
      where: {
        userId: req.user.id,
        id: req.params.orderId
      }
    })
    if (!userOrderInstance) {
      err.message = 'this was a bad user'
      next(err) // needs to be tested, how are we going to throw custom error
    }
    OrdersChairs.destroy({
      where: {
        chairId: req.params.chairId,
        orderId: req.params.orderId
      }
    })
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const orderInstance = await Order.findByPk(req.params.orderId)
    if (req.user.id == orderInstance.userId) {
      // needs to be tested, unsure of left variable
      // this is the route we might use for changing isFulfilled

      const data = await orderInstance.update(req.body)
      res.json(data)
    } else {
      throw new Error('Not the right user')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await Order.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})
