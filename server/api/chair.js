const router = require('express').Router()
const {Chair} = require('../db/models')
module.exports = router

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
