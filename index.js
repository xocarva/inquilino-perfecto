require('dotenv').config()
const express = require('express')
const app = express()
const usersController = require('./controllers/users/index')

const { BASE_URL, PORT } = process.env


app.use(express.json())

//users

app.post('/register', usersController.register)


app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})