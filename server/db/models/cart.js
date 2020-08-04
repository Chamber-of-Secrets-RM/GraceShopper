const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
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
module.exports = Cart
