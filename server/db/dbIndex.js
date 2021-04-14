const mongoose = require('mongoose')
const secret = "secret"

mongoose
    .connect('mongodb://127.0.0.1:27017/finalproject', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports =  db, {secret}