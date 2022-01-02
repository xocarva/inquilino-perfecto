require('dotenv').config()
const express = require('express')
const { usersRoutes } = require('./routes')
const { BASE_URL, PORT } = process.env

const app = express()

app.use(express.json())
app.use('/users', usersRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})