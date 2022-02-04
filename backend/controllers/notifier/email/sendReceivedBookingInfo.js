const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendReceivedBookingInfo = async (bookingData) => {
    const { ownerEmail, house, startDate, endDate } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: ownerEmail,
        subject: "You have a new Booking offer",
        html: `<p>You have received a new booking offer for ${house.title} between ${startDate} and ${endDate}.</p>`
    })
}

module.exports = sendReceivedBookingInfo
