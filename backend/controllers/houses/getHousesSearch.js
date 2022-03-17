const { housesRepository, bookingsRepository, ratingsRepository, usersRepository } = require('../../repository')
const { queryValidator } = require('../../validators')


const getHousesSearch = async (req, res) => {
    const { city, price, rooms, startDate, endDate } = req.query

    try {
        await queryValidator.validateAsync({  price, rooms, startDate, endDate })
    } catch (error) {
        res.status(401)
        res.send({error: error.message})
        return
    }

    if (startDate > endDate || Date.parse(startDate) < new Date()) {
        res.status(409)
        res.send({error: 'Invalid date'})
        return
    }

    let resultHouses
    try {
        const houses = await housesRepository.getHousesByQuery(city, price, rooms)
        const housesWithBookings = await Promise.all(houses.map(async house =>  {
            const bookings = await bookingsRepository.getBookingsByHouseId(house.id)
            return { ...house, bookings }
        }))

        const isAvailable = async house => {
            const bookings = house.bookings
            const available = await bookingsRepository.isHouseAvailable({ bookings, startDate, endDate })
            return available
        }

        const datesFilter = async (housesAndBookings, checkDatesFunction) => Promise.all(housesAndBookings.map(checkDatesFunction))
            .then((results) => housesAndBookings.filter((_v, index) => results[index]))

        const availableHouses = await datesFilter(housesWithBookings, isAvailable)

        const housesWithRatings = await Promise.all(availableHouses.map(async house => {
            const ratings = await ratingsRepository.getRatings({ id: house.ownerId, role:'owner' })
            const ratingAvg = Math.round(ratings.reduce((acc, val) => acc + (val.rating/ratings.length), 0))
            const { firstName, lastName, picture } = await usersRepository.getUserById(house.ownerId)
            return { ...house, ratingAvg, ownerName: `${firstName} ${lastName}`,ownerPic: picture }
        }))

        resultHouses = housesWithRatings.map(house => {
            const [ housePicture ] = house.pictures
            return {
                id: house.id,
                title: house.title,
                city: house.city,
                price: house.price,
                rooms: house.rooms,
                picture: housePicture,
                ownerPic: house.ownerPic,
                ownerName: house.ownerName,
                ownerRating: house.ratingAvg
            }
        })

    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    res.status(200)
    res.send(resultHouses)
}

module.exports = getHousesSearch
