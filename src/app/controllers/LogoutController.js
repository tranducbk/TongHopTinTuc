
const User = require('../models/User')
const Logout = require('../models/Login')
const { send } = require('express/lib/response')

class LogoutController {

    logout(req, res, next) {
        req.session.isAuthenticated = false
        req.session.authUser = null
        res.redirect('/user')
    }

}

module.exports = new LogoutController()