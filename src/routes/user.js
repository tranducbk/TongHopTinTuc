const express = require('express')
const router = express.Router()
const userRouter = require('../app/controllers/UserController')
const loginRouter = require('../app/controllers/LoginController')
const logoutRouter = require('../app/controllers/LogoutController')
const registerRouter = require('../app/controllers/RegisterController')

router.get('/login', userRouter.login)
router.post('/login', loginRouter.login)
router.get('/logout', logoutRouter.logout)
router.get('/register', userRouter.register)
router.post('/register', registerRouter.register)
router.get('/tech-category-01', userRouter.category01)
router.get('/tech-category-01/:pagination', userRouter.category01)
router.get('/tech-category-02', userRouter.category02)
router.get('/tech-category-02/:pagination', userRouter.category02)
router.get('/tech-category-03', userRouter.category03)
router.get('/tech-category-03/:pagination', userRouter.category03)
router.get('/single', userRouter.single)
router.get('/tech-author', userRouter.contact)
router.get('/contact', userRouter.contact)

router.get('/:pagination', userRouter.index)
router.get('/', userRouter.index)
router.post('/', userRouter.search)


module.exports = router