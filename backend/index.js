require('dotenv').config()
const express = require('express')
const fileupload = require("express-fileupload")
const cors = require('cors')
const { usersRoutes, bookingsRoutes, housesRoutes } = require('./routes')
const { BASE_URL, PORT } = process.env

const app = express()

app.use(cors())
app.use(fileupload())
app.use(express.json())
app.use(express.static('public'))
app.use('/users', usersRoutes)
app.use('/bookings', bookingsRoutes)
app.use('/houses', housesRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})
