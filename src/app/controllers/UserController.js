
const Posts = require('../models/Posts')
const mongoose = require('../../utill/mongoose')
const { render } = require('express/lib/response')

class UserController {

    index(req, res, next) {
        Promise.all([Posts.find({}).limit(2), Posts.findOne({ spotling: true }), Posts.find().limit(10).skip(10*req.params.pagination), Posts.find({ spotling: true }).limit(4), Posts.find({topic: 'Khoa học'}).limit(4), 
        Posts.find({topic: 'Công nghệ'}).limit(4), Posts.find({topic: 'Mạng xã hội'}).limit(4) , Posts.find({topic: 'Tin tức xe hơi'}).limit(4), Posts.find({topic: 'Y tế'}).limit(4), Posts.countDocuments({})])
            .then(([posts, post, postlist, postspotlight, postsheadercat01, postsheadercat02, postsheadercat03, postsheadercat04, postsheadercat05, count]) => {
                count = Math.ceil(count/10)
                const paging = []
                for (let i = 1; i <= count; i++) {
                    paging.push(i)
                }
                res.render('tech-index', {
                    posts: mongoose.multipleMongooseToObject(posts),
                    post: mongoose.singleMongooseToObject(post),
                    postlist: mongoose.multipleMongooseToObject(postlist),
                    postspotlight: mongoose.multipleMongooseToObject(postspotlight),
                    postsheadercat01: mongoose.multipleMongooseToObject(postsheadercat01),
                    postsheadercat02: mongoose.multipleMongooseToObject(postsheadercat02),
                    postsheadercat03: mongoose.multipleMongooseToObject(postsheadercat03),
                    postsheadercat04: mongoose.multipleMongooseToObject(postsheadercat04),
                    postsheadercat05: mongoose.multipleMongooseToObject(postsheadercat05),
                    paging,
                    partials: true
                })
            })
            .catch(next)
    }

    login(req, res) {
        res.render('User/tech-login', {
            partials: true
        })
    }

    register(req, res) {
        res.render('User/tech-register', {
            partials: true
        })
    }

    category01(req, res) {
        res.render('User/tech-category-01', {
            partials: true
        })
    }

    category02(req, res, next) {
        Promise.all([Posts.find({topic: 'Góc nhìn'}).sort({updatedAt: -1}), Posts.find({ spotling: true }).limit(4), Posts.find({topic: 'Khoa học'}).limit(4), 
        Posts.find({topic: 'Công nghệ'}).limit(4), Posts.find({topic: 'Mạng xã hội'}).limit(4) , Posts.find({topic: 'Tin tức xe hơi'}).limit(4), Posts.find({topic: 'Y tế'}).limit(4), Posts.countDocuments({topic: 'Góc nhìn'})])
            .then(([postlist, postspotlight, postsheadercat01, postsheadercat02, postsheadercat03, postsheadercat04, postsheadercat05, count]) => {
                count = Math.ceil(count/10)
                const paging = []
                for (let i = 1; i <= count; i++) {
                    paging.push(i)
                }
                res.render('User/tech-category-02', {
                    postlist: mongoose.multipleMongooseToObject(postlist),
                    postspotlight: mongoose.multipleMongooseToObject(postspotlight),
                    postsheadercat01: mongoose.multipleMongooseToObject(postsheadercat01),
                    postsheadercat02: mongoose.multipleMongooseToObject(postsheadercat02),
                    postsheadercat03: mongoose.multipleMongooseToObject(postsheadercat03),
                    postsheadercat04: mongoose.multipleMongooseToObject(postsheadercat04),
                    postsheadercat05: mongoose.multipleMongooseToObject(postsheadercat05),
                    paging,
                    partials: true
                })
            })
            .catch(next)
    }

    category03(req, res) {
        res.render('User/tech-category-03', {
            partials: true
        })
    }

    single(req, res) {
        res.render('User/tech-single', {
            partials: true
        })
    }

    contact(req, res) {
        res.render('User/tech-contact', {
            partials: true
        })
    }

    author(req, res) {
        res.render('User/tech-author', {
            partials: true
        })
    }

    search(req, res, next) {
        Promise.all([Posts.find({name: {$regex: req.body.name }}), Posts.find({ spotling: true }).limit(4), Posts.countDocuments({name: req.body.name})])
            .then(([postlist, postspotlight, count]) => {
                count = Math.ceil(count/10)
                const paging = []
                for (let i = 1; i <= count; i++) {
                    paging.push(i)
                }
                res.render('User/tech-category-01', {
                    postlist: mongoose.multipleMongooseToObject(postlist),
                    postspotlight: mongoose.multipleMongooseToObject(postspotlight),
                    paging,
                    partials: true
                })
            })
            .catch(next)
    }
}

module.exports = new UserController