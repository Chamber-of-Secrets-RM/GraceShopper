const Sequelize = require('sequelize')
const db = require('../db')

const Tags = db.define('tags', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Tags
