const express = require('express')
const app = express()
const auth = require('./routes/auth.route')
const stories = require('./routes/stories.route')
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

app.use(passport.initialize())
app.use(passport.session())

app.use('/v1/auth', auth)
app.use('/v1/top-stories', stories)

module.exports = app
