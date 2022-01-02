require('dotenv').config()
const express = require('express')
const { usersRoutes } = require('./routes/index')
const { BASE_URL, PORT } = process.env

const app = express()

app.use(express.json())
app.use('/users', usersRoutes)
//TO-DO
// create account on sendgrid
// avatar attachment on register
// user/validate endpoint

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})