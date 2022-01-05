const express = require('express')
const router = express.Router()
const isAuthorized = require('../middlewares/isAuthorized')
const { createHouse } = require('../controllers/houses')


router.post('/', isAuthorized, createHouse)


module.exports = router
