const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendBookingOfferPendingOwner = async (bookingData) => {
  const { emailOwner, startDate, endDate } = bookingData


    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: emailOwner,
        subject: "Have a new Booking offer",
        html: `<p>Have a offer booking of ${startDate} at ${endDate}.</p>`
    })
}

module.exports = sendBookingOfferPendingOwner
