//Matan Gazit
//For CS4011

//control methods for the Eva model
//This code will be reused for almost every model.. Edited accordingly

const Eva = require('../models/evaModel')

//creates an evangelion unit
createEva = (req, res) => {
    const body = req.body

    if (!body) { //If there is no body found in the request
        return res.status(400).json({
            success: false,
            error: 'You must provide an Evangelion',
        })
    }

    const eva = new Eva(body)

    if (!eva) { //if it could not be allocated
        return res.status(400).json({ success: false, error: err })
    }

    eva
        .save() //commit it
        .then(() => { //then tell them it's done
            return res.status(201).json({
                success: true,
                id: eva._id,
                message: 'Evangelion Unit Constructed',
            })
        })
        .catch(error => { //if the unit cannot be created
            return res.status(400).json({
                error,
                message: 'Critical Failure in Evangelion Production Site!',
            })
        })
}

//update an Evangelion unit
updateEva = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Eva.findOne({ _id: req.params.id }, (err, eva) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Eva not found!',
            })
        }
        eva.name = body.name
        eva.modelType = body.modelType
        eva.pilot = body.pilot
        eva.operational = body.operational

        eva
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: eva._id,
                    message: `Evangelion Unit ${eva.name} updated!`,
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Eva not updated!',
                })
            })
    })
}

//delete an Eva
deleteEva = async (req, res) => {
    await Eva.findOneAndDelete({ _id: req.params.id }, (err, eva) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!eva) {
            return res
                .status(404)
                .json({ success: false, error: `Eva not found` })
        }

        return res.status(200).json({ success: true, data: eva })
    }).catch(err => console.log(err))
}

//get a single Unit by its Id
getEvaById = async (req, res) => {
    await Eva.findOne({ _id: req.params.id }, (err, eva) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!eva) {
            return res
                .status(404)
                .json({ success: false, error: `Eva not found` })
        }
        return res.status(200).json({ success: true, data: eva })
    }).catch(err => console.log(err))
}

//get all Units
getEva = async (req, res) => {
    await Eva.find({}, (err, eva) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!eva.length) {
            return res
                .status(404)
                .json({ success: false, error: `Eva not found` })
        }
        return res.status(200).json({ success: true, data: eva })
    }).catch(err => console.log(err))
}

module.exports = {
    createEva,
    updateEva,
    deleteEva,
    getEvaById,
    getEva,
}