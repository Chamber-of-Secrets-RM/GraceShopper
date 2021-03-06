const db = require('./db')
const Order = require('./models/order')
const Chair = require('./models/chair')
const User = require('./models/user')
const OrdersChairs = require('./models/ordersChairs')
const Tags = require('./models/tags')
const ChairTags = require('./models/chairTags')

// Chair.hasMany(User)
// User.hasMany(Chair)

Order.belongsToMany(Chair, {through: OrdersChairs})
Chair.belongsToMany(Order, {through: OrdersChairs})

Tags.belongsToMany(Chair, {through: ChairTags})
Chair.belongsToMany(Tags, {through: ChairTags})

User.hasMany(Order)
Order.belongsTo(User)

// register models
require('./models')

// other models being exported through /models/index
module.exports = {
  db
}
