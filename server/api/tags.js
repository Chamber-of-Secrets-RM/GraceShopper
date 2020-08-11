const router = require('express').Router()
const {Tags} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const tags = await Tags.findAll({})
    res.json(tags)
  } catch (err) {
    next(err)
  }
})
