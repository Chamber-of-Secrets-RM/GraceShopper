const Sequelize = require('sequelize')
const db = require('../db')

const Purchased = db.define('purchased', {
  UserId: {
    type: Sequelize.INTEGER
  },
  itemId: {
    type: Sequelize.INTEGER
  },
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})
module.exports = Purchased
