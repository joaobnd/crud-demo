const express = require('express')

const app = express()

app.use(express.json())

app.get('/_health_check', (req, res) => res.sendStatus(200))

module.exports = app
