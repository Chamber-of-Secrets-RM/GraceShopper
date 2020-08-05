const Sequelize = require('sequelize')
const db = require('../db')

const Chair = db.define('chair', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '/images/mars.png'
  },
  price: {
    //need a function to get the 'float number'
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rating: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5')
  },
  category: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Chair
