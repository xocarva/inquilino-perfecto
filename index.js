const express = require('express')
require('dotenv').config()

const app = express()

const { BASE_URL, PORT } = process.env

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}:${PORT}`)
})