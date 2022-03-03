const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendMadeBookingInfo = async (bookingData) => {
  const { tenantEmail, house, startDate, endDate } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: tenantEmail,
        subject: "Petición de reserva pendiente",
        html: `<p>Has hecho una reserva para ${house.title} entre el ${startDate} y el ${endDate}. Debe ser confirmada por el propietario.</p>`
    })

}

module.exports = sendMadeBookingInfo
