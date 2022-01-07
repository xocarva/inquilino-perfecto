const express = require('express')
const router = express.Router()
const { isAuthorized, isActive } = require('../middlewares')
const { createHouse, getHouse, getHousesSearch } = require('../controllers/houses')

router.post('/', isAuthorized, isActive, createHouse)
router.get('/', getHousesSearch)
router.get('/:houseId', getHouse)


module.exports = router
