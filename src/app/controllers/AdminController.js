
const Posts = require('../models/Posts')
const User = require('../models/User')
const mongoose = require('../../utill/mongoose')
const { render } = require('express/lib/response')

class AdminController {

    index(req, res, next) {
        const today = new Date()
        console.log(today.toString())

        Promise.all([Posts.countDocuments({}), User.countDocuments({}), Posts.countDocuments({createdAt: today.toString()})])
            .then(([countPost, countUser, countPostNew]) => {
                res.render('Admin/index', {
                    countPost,
                    countUser,
                    countPostNew,
                    partials: false
                })
            })
            .catch(next)
    }

    assets(req, res, next) {
        Posts.find({}) 
            .then(posts => res.render('Admin/assets', {
                posts: mongoose.multipleMongooseToObject(posts)
            }))
            .catch(next)
    }
    
    searchPost(req, res, next) {
        const formData = req.body

        if (formData.name === '' && formData.author === '' && formData.topic === 'Chọn chủ đề') {
            Posts.find({})
                    .then(posts => res.render('Admin/assets', {
                        posts: mongoose.multipleMongooseToObject(posts)
                    }))
                    .catch(next)
        }
        else {
            if(formData.name === ''){
                if (formData.author === ''){
                    Posts.find({topic: formData.topic})
                        .then(posts => res.render('Admin/assets', {
                            posts: mongoose.multipleMongooseToObject(posts)
                        }))
                        .catch(next)
                }
                else if (formData.topic === 'Chọn chủ đề') {
                    Posts.find({author: formData.author})
                        .then(posts => res.render('Admin/assets', {
                            posts: mongoose.multipleMongooseToObject(posts)
                        }))
                        .catch(next)
                }
                else {
                    Posts.find({author: formData.author, topic: formData.topic})
                        .then(posts => res.render('Admin/assets', {
                            posts: mongoose.multipleMongooseToObject(posts)
                        }))
                        .catch(next)
                }
            }
            if(formData.author === ''){
                if (formData.name === ''){
                    Posts.find({topic: formData.topic})
                        .then(posts => res.render('Admin/assets', {
                            posts: mongoose.multipleMongooseToObject(posts)
                        }))
                        .catch(next)
                }
                else if (formData.topic === 'Chọn chủ đề') {
                    Posts.find({name: formData.name})
                        .then(posts => res.render('Admin/assets', {
                            posts: mongoose.multipleMongooseToObject(posts)
                        }))
                        .catch(next)
                }
                else {
                    Posts.find({name: formData.name, topic: formData.topic})
                        .then(posts => res.render('Admin/assets', {
                            posts: mongoose.multipleMongooseToObject(posts)
                        }))
                        .catch(next)
                }
            }
            if(formData.topic === 'Chọn chủ đề'){
                if (formData.author === ''){
                    Posts.find({name: formData.name})
                        .then(posts => res.render('Admin/assets', {
                            posts: mongoose.multipleMongooseToObject(posts)
                        }))
                        .catch(next)
                }
                else if (formData.name === '') {
                    Posts.find({author: formData.author})
                        .then(posts => res.render('Admin/assets', {
                            posts: mongoose.multipleMongooseToObject(posts)
                        }))
                        .catch(next)
                }
                else {
                    Posts.find({author: formData.author, name: formData.name})
                        .then(posts => res.render('Admin/assets', {
                            posts: mongoose.multipleMongooseToObject(posts)
                        }))
                        .catch(next)
                }
            }
        }
        
    }

    chat(req, res) {
        res.render('Admin/chat', {
            partials: false
        })
    }

    employees(req, res) {
        res.render('Admin/employees', {
            partials: false
        })
    }

    users(req, res, next) {
        User.find({})
            .then(user => res.render('Admin/users', {
                user: mongoose.multipleMongooseToObject(user)
            }))
            .catch(next)
    }

    userdashboard(req, res) {
        res.render('Admin/user-dashboard', {
            partials: false
        })
    }

    postscontent(req, res) {
        res.render('Admin/posts-content', {
            partials: false
        })
    }

    searchUser(req, res, next) {
        const formData = req.body

        console.log(req.body)
        if (formData.name === '' && formData.email === '' && formData.permission === 'Chọn phân quyền') {
            User.find({})
                .then(user => res.render('Admin/users', {
                    user: mongoose.multipleMongooseToObject(user)
                }))
                .catch(next)
        }
        else {
            if (formData.name === ''){
                if (formData.email === '') {
                    User.find({permission: formData.permission})
                        .then(user => res.render('Admin/users', {
                            user: mongoose.multipleMongooseToObject(user)
                        }))
                        .catch(next)
                }
                else if (formData.permission === 'Chọn phân quyền') {
                    User.find({email: formData.email})
                        .then(user => res.render('Admin/users', {
                            user : mongoose.multipleMongooseToObject(user)
                        }))
                        .catch(next)
                }
                else {
                    User.find({permission: formData.permission, email: formData.email})
                        .then(user => render('Admin/users', {
                            user : mongoose.multipleMongooseToObject(user)
                        }))
                        .catch(next)
                }
            }
            if (formData.email === ''){
                if (formData.name === '') {
                    User.find({permission: formData.permission})
                        .then(user => res.render('Admin/users', {
                            user: mongoose.multipleMongooseToObject(user)
                        }))
                        .catch(next)
                }
                else if (formData.permission === 'Chọn phân quyền') {
                    User.find({name: formData.name})
                        .then(user => res.render('Admin/users', {
                            user : mongoose.multipleMongooseToObject(user)
                        }))
                        .catch(next)
                }
                else {
                    User.find({permission: formData.permission, name: formData.name})
                        .then(user => render('Admin/users', {
                            user : mongoose.multipleMongooseToObject(user)
                        }))
                        .catch(next)
                }
            }
            if (formData.permission === 'Chọn phân quyền'){
                if (formData.email === '') {
                    User.find({name: formData.name})
                        .then(user => res.render('Admin/users', {
                            user: mongoose.multipleMongooseToObject(user)
                        }))
                        .catch(next)
                }
                else if (formData.name === '') {
                    User.find({email: formData.email})
                        .then(user => res.render('Admin/users', {
                            user : mongoose.multipleMongooseToObject(user)
                        }))
                        .catch(next)
                }
                else {
                    User.find({name: formData.name, email: formData.email})
                        .then(user => render('Admin/users', {
                            user : mongoose.multipleMongooseToObject(user)
                        }))
                        .catch(next)
                }
            }
        }
    }

    register(req, res, next) {
        const formData = req.body
        const user = new User(formData)
        User.findOne({email: user.email})
            .then( usercheck => {
                if (!usercheck) {
                    user.save()
                        .then(() => res.redirect('/users/'))
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

module.exports = new AdminController