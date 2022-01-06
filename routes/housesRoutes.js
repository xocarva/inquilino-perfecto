const express = require('express')
const router = express.Router()
const { isAuthorized, isActive } = require('../middlewares')
const { createHouse } = require('../controllers/houses')


router.post('/', isAuthorized, isActive, createHouse)


module.exports = router
