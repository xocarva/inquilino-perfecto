const encryptor = require('../../shared/encryptor')
const { generateToken } = require('../../shared/token')
const { credentialsValidator } = require('../../validators')
const { usersRepository } = require('../../repository/')

const login = async (req, res) => {
  const credentials = req.body

  try {
    await credentialsValidator.validateAsync(credentials)
  } catch (error) {
    res.status(400)
    res.send(error.message)
    return
  }

  let user
  try {
    user = await usersRepository.getUserByEmail(credentials.email)
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

  if (!user) {
    res.status(404)
    res.end('User not found')
    return
  }

  if (!await encryptor.compare(credentials.password, user.password)) {
    res.status(403)
    res.end('Invalid credentials')
    return
  }

  const token = generateToken({ payload: { user: { id: user.id } } })

  console.log(token)

  res.status(200)
  res.send({ token })
}

module.exports = login