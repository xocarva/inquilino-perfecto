const { usersRepository } = require('../repository')

const isActive = async (req, res, next) => {
  const userId = req.user.id

  let isActive
  try {
    isActive = (await usersRepository.getUserById(userId)).active
  } catch (error) {
    res.status(500)
    res.end(error.message)
  }

  if (!isActive) {
    res.status(403)
    res.end('Must be an active user to do that')
    return
  }

  next()
}

module.exports = isActive