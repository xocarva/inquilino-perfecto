const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendOwnerBookingCancelInfo = async (bookingData) => {
  const { ownerEmail, startDate, endDate, house } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: ownerEmail,
        subject: "Reserva cancelada",
        html: `<p>La reserva para ${house.title} desde el ${startDate} hasta el ${endDate} ha sido cancelada.</p>`
    })

}

module.exports = sendOwnerBookingCancelInfo
