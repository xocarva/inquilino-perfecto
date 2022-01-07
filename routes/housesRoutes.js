const express = require('express')
const router = express.Router()
const { isAuthorized, isActive } = require('../middlewares')
const { createHouse, getHouse } = require('../controllers/houses')


router.post('/', isAuthorized, isActive, createHouse)
router.get('/:houseId', getHouse)



module.exports = router
