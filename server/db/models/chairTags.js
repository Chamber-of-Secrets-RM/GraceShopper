const Sequelize = require('sequelize')
const db = require('../db')

const ChairTags = db.define('chairTags', {})

module.exports = ChairTags
