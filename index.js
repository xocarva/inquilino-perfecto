require('dotenv').config()
const express = require('express')
const app = express()
const usersController = require('./controllers/users/index')

const { BASE_URL, PORT } = process.env


app.use(express.json())

//users

app.post('/register', usersController.register)

//TO-DO
// create account on sendgrid
// avatar attachment on register
// routes for controllers
// user/validate endpoint


app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})