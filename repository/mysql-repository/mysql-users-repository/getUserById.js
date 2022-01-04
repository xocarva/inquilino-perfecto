const connection = require('../mysqlConnection')

const getUserById = async (userId) => {
    const [[ user ]] = await connection.query("SELECT * FROM users WHERE id = ?",
    [userId])
    const profileData = {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        bio: user.bio,
        picture: user.picture
    }
    return profileData
  }

  module.exports = getUserById