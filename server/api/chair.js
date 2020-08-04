const router = require('express').Router()
const {Chair} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Chair.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
