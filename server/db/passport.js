//Matan Gazit
//CS4011

const JwtStrat = require("passport-jwt").Strategy
//const schema = require('../models/userModel')
const ExtractJwt = require("passport-jwt").ExtractJwt
const mongoose = require("mongoose")
const UserModel = require('../models/userModel')
const db = require("../db/dbIndex")

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = "secret"

module.exports = passport => {
    passport.use(
        new JwtStrat(opts, (jwt_payload, done) => {
            UserModel.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user)
                    }
                    return done(null, false)
                })
                .catch(err => console.log(err))
        })
    )
}