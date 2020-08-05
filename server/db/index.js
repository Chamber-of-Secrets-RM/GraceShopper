const db = require('./db')
const Order = require('./models/order')
const Chair = require('./models/chair')
const User = require('./models/user')
const OrdersChairs = require('./models/ordersChairs')

// Chair.hasMany(User)
// User.hasMany(Chair)

Order.belongsToMany(Chair, {through: OrdersChairs})
Chair.belongsToMany(Order, {through: OrdersChairs})

User.hasMany(Order)
Order.belongsTo(User)

// register models
require('./models')

module.exports = {
  db
  // Chair,
  // User,
}
