const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({})
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

router.get('/:cartId', async (req, res, next) => {
  try {
    const data = await Cart.findOne({
      where: {
        id: req.params.cartId
      }
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await Cart.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})
