const router = require('express').Router()
const {Order, OrdersChairs, Chair} = require('../db/models')

module.exports = router

// const isAdminOrProperUserMiddleware = (req, res, next) => {
//   const currentUser = req.session.user
//   // needs to be tested to see how to test for user//
//   if (currentUser || currentUser.isAdmin) {
//     next()
//   } else {
//     const error = new Error(
//       'You are not allowed to do this the authorities have been notified'
//     )
//     error.status = 401
//     next(error)
//   }
// }
router.get(
  // this route is for the initial population of cart when a user logs in
  '/user/:userId/',
  // isAdminOrProperUserMiddleware,
  async (req, res, next) => {
    try {
      console.log('what is Order', Order)
      const [orders, orderCreated] = await Order.findOrCreate({
        where: {
          userId: req.params.userId,
          isFulfilled: 0 // 0 is unfulfilled, 1 is fulfilled
        },
        include: {
          model: Chair
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

  '/user/:userId/History/',

  // isAdminOrProperUserMiddleware,
  async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        where: {
          userId: req.params.userId,
          isFulfilled: 1
        },
        include: {
          model: Chair
        }
      })
      // check if admin or correct user //
      res.json(orders)
    } catch (err) {
      next(err)
    }
  }
)
// This route gives all the info you need for what is in your cart/Checking out

// needs to be reviewed
// router.get(
//   '/:orderId',
//   // isAdminOrProperUserMiddleware,
//   async (req, res, next) => {
//     try {
//       const data = await OrdersChairs.findAll({
//         where: {
//           orderId: req.params.orderId
//         }
//       })
//       res.json(data)
//     } catch (error) {
//       next(error)
//     }
//   }
// )

//Adds new item to the current user's order/cart; calculates price based on quantity on backend
//to avoid bypassing prices defined on front end.
router.post('/user/:userId/chair/:chairId', async (req, res, next) => {
  try {
    const [userOrderInstance] = await Order.findAll({
      where: {
        userId: req.params.userId,
        isFulfilled: 0 // 0 is unfulfilled, 1 is fulfilled
      }
    })
    if (!userOrderInstance) {
      err.message = 'this was a bad user'
      next(err) // needs to be tested, how are we going to throw custom error
      /// Could just check req.session instead of lines 69-78
    }
    const currentChair = await Chair.findByPk(req.params.chairId)
    const data = await OrdersChairs.create({
      orderId: userOrderInstance.id,
      chairId: req.params.chairId,
      quantity: req.body.quantity,
      itemTotal: currentChair.price * req.body.quantity
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

///     api/orders/user/:userId/chair/:chairId/'

//Need to check order on front end to make sure chair is in the order/cart
router.put('/user/:userId/chair/:chairId', async (req, res, next) => {
  try {
    const [userOrderInstance] = await Order.findAll({
      where: {
        userId: req.params.userId,
        isFulfilled: 0 // 0 is unfulfilled, 1 is fulfilled
      }
    })
    if (!userOrderInstance) {
      err.message = 'this was a bad user'
      next(err) // needs to be tested, how are we going to throw custom error
    }
    console.log('WHAT IS URDERORDERID', userOrderInstance.id)
    console.log('WHAT IS chairId', req.params.chairId)
    const currentChair = await Chair.findByPk(req.params.chairId)
    const [numUpdated, affectedRows] = await OrdersChairs.update(
      {
        quantity: req.body.quantity
        // itemTotal: currentChair.price * req.body.quantity
      },
      {
        where: {
          orderId: userOrderInstance.id,
          chairId: req.params.chairId
        },
        returning: true
      }
    )
    console.log('WHAT IS NUMUPDATED', numUpdated)
    console.log('WHAT IS DATA ON THE BACKEND fOR PUT', affectedRows)
    res.json(affectedRows[0])
  } catch (error) {
    next(error)
  }
})

router.delete('/user/:userId/chair/:chairId/', async (req, res, next) => {
  try {
    const [userOrderInstance] = await Order.findAll({
      where: {
        userId: req.params.userId,
        isFulfilled: 0 // 0 is unfulfilled, 1 is fulfilled
      }
    })
    if (!userOrderInstance) {
      err.message = 'this was a bad user'
      next(err) // needs to be tested, how are we going to throw custom error
    }
    OrdersChairs.destroy({
      where: {
        chairId: req.params.chairId,
        orderId: userOrderInstance.id
      }
    })
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

// router.put(
//   '/:orderId',
//   isAdminOrProperUserMiddleware,
//   async (req, res, next) => {
//     try {
//       const orderInstance = await Order.findByPk(req.params.orderId)
//       if (req.user.id == orderInstance.userId) {
//         // needs to be tested, unsure of left variable
//         // this is the route we might use for changing isFulfilled

//         const data = await orderInstance.update(req.body)
//         res.json(data)
//       } else {
//         throw new Error('Not the right user')
//       }
//     } catch (error) {
//       next(error)
//     }
//   }
// )

router.post(
  '/',
  /*isAdminOrProperUserMiddleware,*/ async (req, res, next) => {
    try {
      const data = await Order.create(req.body)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
)
