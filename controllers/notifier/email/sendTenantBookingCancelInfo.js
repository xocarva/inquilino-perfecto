const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendTenantBookingCancelInfo = async (bookingData) => {
  const { tenantEmail, startDate, endDate, house } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: tenantEmail,
        subject: "Your booking has been canceled",
        html: `<p>Your booking for ${house.title} from ${startDate} to ${endDate} has been canceled.</p>`
    })

}

module.exports = sendTenantBookingCancelInfo
