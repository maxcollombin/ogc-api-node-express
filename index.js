const express = require('express')
const app = express()
const port = 3000

var route = require('./route')

app.use('/', route)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
