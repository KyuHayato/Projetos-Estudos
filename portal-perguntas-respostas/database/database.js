const Sequelize = require('sequelize')
const connection = new Sequelize('guiaperguntas', 'root', 'Rocklee767', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection 