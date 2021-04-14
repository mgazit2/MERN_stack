//Matan Gazit
//For CS4011
//This is a router
//This ended up being the router for everything

const express = require('express')
const passport = require('passport')
//const users = require('./controllers/userCtrlr')

const EvaCtrlr = require('../controllers/evaCtrlr')
const UsrCtrlr = require('../controllers/userCtrlr')

//import Validator from 'validator'
//import isEmpty from 'is-empty' //to check if things are empty

const router = express.Router()

router.use(passport.initialize())
require('../db/passport')(passport)

router.post('/eva', EvaCtrlr.createEva)
router.put('/eva/:id', EvaCtrlr.updateEva)
router.delete('/eva/:id', EvaCtrlr.deleteEva)
router.get('/eva/:id', EvaCtrlr.getEvaById)
router.get('/eva', EvaCtrlr.getEva)
router.post('/eva/register', UsrCtrlr.createUser)
router.post('/eva/login', UsrCtrlr.loginUser)

module.exports = router