const Sequelize = require('sequelize')
const db = require('../db')

const OrdersChairs = db.define('ordersChairs', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemTotal: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})
module.exports = OrdersChairs