//being hopeful here...
//If this is working by the time I turn it in, much progress was at this point..
//Sad..

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Pilot = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        eva: { type: String, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('pilots', Pilot)