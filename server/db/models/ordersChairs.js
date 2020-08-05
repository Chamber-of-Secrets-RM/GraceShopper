const Sequelize = require('sequelize')
const db = require('../db')

const OrdersChairs = db.define('ordersChairs', {
  Quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ItemTotal: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})
module.exports = OrdersChairs
