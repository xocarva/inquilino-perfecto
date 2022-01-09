const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendOwnerBookingCancelInfo = async (bookingData) => {
  const { ownerEmail, startDate, endDate, house } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: ownerEmail,
        subject: "Booking has been canceled",
        html: `<p>Booking for ${house.title} from ${startDate} to ${endDate} has been canceled.</p>`
    })

}

module.exports = sendOwnerBookingCancelInfo
