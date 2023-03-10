const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')
app.set('views', './app/views')
app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({ extended: true }))

//autoload para as rotas, models e controllers
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app