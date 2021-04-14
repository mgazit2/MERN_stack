const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Evangelion = new Schema(
    {
        name: { type: String, required: true },
        modelType: { type: String, required: true },
        pilot: { type: String, required: true },
        operational: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('evas', Evangelion)