const Posts = require('../models/Posts')
const mongoose = require('../../utill/mongoose')
const { render } = require('express/lib/response')

class PostController {


    // [POST] /post/create
    create(req, res, next) {
        const formData = req.body
        formData.spotling = true
        const post = new Posts(formData)
        post.save()
            .then(() => res.redirect('/admin/assets'))
            .catch(next) 
    }
    
    // [GET] /post-edit/:id/edit
    edit(req,res,next) {
        Posts.findById(req.params.id) 
            .then(post => res.render('Admin/post-edit', {
                post: mongoose.singleMongooseToObject(post)
            }))
            .catch(next)    
    }

    // [PUT] /post-edit/:id/
    update(req, res, next) {
        Posts.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/assets'))
            .catch(next)
    }

    // [DELETE] /post-edit/:id/
    delete(req, res, next) {
        Posts.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    topic(req, res, next) {
        Posts.find({topic: id})
    }
}

module.exports = new PostController();
