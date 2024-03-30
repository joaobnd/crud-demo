const express = require('express')

const ContactController = require('../controllers/contact')
const app = express()

app.use(express.json())

app.get('/_health_check', (_, res) => res.sendStatus(200))

app.post('/contact', ContactController.create)









module.exports = app
