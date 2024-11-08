const User = require('../models/User')

class RegisterController {
    // [POST] /user/register
    register(req, res, next) {
        const formData = req.body
        const user = new User(formData)
        User.findOne({email: user.email})
            .then( usercheck => {
                if (!usercheck) {
                    user.save()
                        .then(() => res.redirect('/user/0'))
                        .catch(next)
                }
                else{
                    res.render('User/tech-register', {
                        mes: 'Email đã tồn tại'
                    })
                }
            })
            .catch(next)
        
    }
}

module.exports = new RegisterController()