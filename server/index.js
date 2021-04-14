const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
//const passport = require('passport')

//const users = require('./controllers/userCtrlr')

const db = require('./db/dbIndex')
const evaRouter = require('./routes/evaRouter')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//app.use(passport.initialize())
//require('./db/passport')(passport)


app.get('/', (req, res) => {
    res.send('We doing Eva shit here!')
})

//let's get routing
app.use('/eva/', evaRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))