const Sequelize = require('sequelize')
const db = require('../db')

const OrdersChairs = db.define('ordersChairs', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemTotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      const rawValue = this.dataValues.price
      return rawValue / 100
    }
  }
})

OrdersChairs.beforeValidate(orderThrough => {
  console.log('current chair to order:', orderThrough.dataValues)
  orderThrough.itemTotal = parseInt(orderThrough.dataValues.itemTotal * 100)
})

module.exports = OrdersChairs
