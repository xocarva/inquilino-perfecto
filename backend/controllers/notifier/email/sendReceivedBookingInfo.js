const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendReceivedBookingInfo = async (bookingData) => {
    const { ownerEmail, house, startDate, endDate } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: ownerEmail,
        subject: "Tienes una nueva petición reserva",
        html: `<p>Has recibido una nueva petición de reserva para ${house.title} entre el ${startDate} y el ${endDate}.</p>`
    })
}

module.exports = sendReceivedBookingInfo
