const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const path = require('path')
const connect = require('./config/db/index')
const route = require('./routes')
const session = require('express-session')
const methodOverride = require('method-override')

const app = express()
const port = 3000

connect.connect()

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use(async function (req, res, next) {
  if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false
  }
  res.locals.IsAuthenticated = req.session.isAuthenticated
  res.locals.AuthUser = req.session.authUser
  next()
})

app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.engine('hbs', engine({
  extname: 'hbs',
  helpers: {
    sum: (a, b) => a+b,
    sub: (a, b) => a-b,
    percent: (a, b) => a/b*100,
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/user`)
})