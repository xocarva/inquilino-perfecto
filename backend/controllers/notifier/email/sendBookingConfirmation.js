const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendBookingConfirmation = async (bookingData) => {
  const { tenantEmail, startDate, endDate, house } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: tenantEmail,
        subject: "Confirmación de reserva",
        html: `<p>Tu reserva para ${house.title} desde el ${startDate} hasta el ${endDate} ha sido confirmada.</p>`
    })

}

module.exports = sendBookingConfirmation