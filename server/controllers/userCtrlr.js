//Matan Gazit
//CS4011
//Maintains the methods for the user model in our database

const bcrypt = require("bcrypt")
const db = require("../db/dbIndex")
const webtoken = require("jsonwebtoken")
const validateReg = require("../validation/register")
const logUser = require("../validation/login")
const secretOrKey = "secret"

const User = require("../models/userModel")

createUser = (req, res) => {
    const body = req.body
    const { errors, isValid } = validateReg(req.body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a user body"
        })
    }

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({
            success: false,
            error: err 
        })
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({
                success: false,
                error: "Email already exists"
            })
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.logg(err))
                })
            })
        }
    })
}

loginUser = (req, res) => {
    const { errors, isValid } = logUser(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const username = req.body.username
    const password = req.body.password

    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    usernotfound: "Could not match your username to one in our database"
                })
            }
        
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //If match, create payload
                const payload = {
                    id: user.id,
                    username: user.username
                }

                webtoken.sign(
                    payload,
                    secretOrKey,
                    {
                        expiresIn: 31556926 //one second
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token //TODO: figure out why token is undefined
                        })
                    }
                )
            } else {
                return res
                    .status(400)
                    .json({
                        passwordincorrect: "Password incorrect"
                    })
            }
        })
    })
}

module.exports = {
    createUser,
    loginUser,
}