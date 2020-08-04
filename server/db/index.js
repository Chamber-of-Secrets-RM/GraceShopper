const db = require('./db')
const Order = require('./models/order')
const Chair = require('./models/chair')
const User = require('./models/user')

// Chair.hasMany(User)
// User.hasMany(Chair)

Order.belongsToMany(Chair, {through: 'cart-history'})
Chair.belongsToMany(Order, {through: 'cart-history'})

User.hasMany(Order)
Order.belongsTo(User)

// register models
// require('./models')

module.exports = {
  db
  // Chair,
  // User,
}
