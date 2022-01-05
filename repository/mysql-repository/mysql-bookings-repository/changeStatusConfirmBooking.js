const connection = require('../mysqlConnection')


let email

const changeStatusConfirmBooking = async (bookingId) => {
    const result = connection.query(`UPDATE bookings SET accepted = true WHERE id = ${bookingId}`)

    // const idTenant = await connection.query(`SELECT id_tenant FROM bookings WHERE id = ${bookingId}`)
    
    // const emailTenant = await connection.query(`SELECT email FROM users WHERE id = ${idTenant[0][0].id_tenant}`)

    // email = await emailTenant[0][0].email


    console.log(bookingId)
    return
}





module.exports = {
    changeStatusConfirmBooking,
}