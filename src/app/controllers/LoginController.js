
const User = require('../models/User')
const Login = require('../models/Login')
const { send } = require('express/lib/response')

class LoginController {

    login(req, res, next) {
        const formData = req.body
        User.findOne({ email: req.body.email, password: req.body.password })
            .then(login => {
                if (login) {
                    login.password = null
                    req.session.isAuthenticated = true
                    req.session.authUser = login
                    if (req.session.authUser.permission === "User") {
                        res.redirect('/user/0')
                    } 
                    if (req.session.authUser.permission === "Admin") {
                        res.redirect('/admin/')
                    }
                }
                else{
                    res.send('Email hoặc mật khẩu không chính xác')
                }
            })
            .catch(next)
        
    }

}

module.exports = new LoginController()