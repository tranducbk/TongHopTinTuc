const express = require('express')
const router = express.Router()
const adminRouter = require('../app/controllers/AdminController')
const postRouter = require('../app/controllers/PostController')
const restrict = require('../utill/middleware')


router.get('/post-content', restrict, adminRouter.postscontent)
router.post('/post-content', restrict, postRouter.create)
router.get('/assets', restrict, adminRouter.assets)
router.delete('/assets/:id', restrict, postRouter.delete)
router.post('/assets/search', restrict, adminRouter.searchPost)
router.get('/:id/edit', restrict, postRouter.edit)
router.put('/post-edit/:id', restrict, postRouter.update)
router.get('/chat', restrict, adminRouter.chat)
router.get('/employees', restrict, adminRouter.employees)
router.get('/users', restrict, adminRouter.users)
router.post('/users/search', restrict, adminRouter.searchUser)
router.post('/users/add', restrict, adminRouter.register)
router.get('/user-dashboard', restrict, adminRouter.userdashboard)

router.get('/', restrict, adminRouter.index)


module.exports = router