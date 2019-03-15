const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const auth = require('./routes/auth.route')
const stories = require('./routes/articles.route')
const users = require('./routes/user.route')
const passportSetup = require('./config/passportSetup')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('dotenv').config()

const mongoDbURI = process.env.MONGODB_URI

mongoose.connect(mongoDbURI, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const connection = mongoose.connection
connection.on('open', () => { console.log("Successfully connected to db") })
connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
connection.on('disconnected', () => { console.log("DB connection closed") })

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({origin: true, credentials: true}))
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())

app.disable('etag');

app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/top-articles', stories)

module.exports = app
