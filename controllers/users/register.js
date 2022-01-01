const { usersRepository } = require('../../repository/index')

const register = async (req, res) => {
    const user = req.body

    if (!user) {
      res.status(400)
      res.end('You should provide a valid user to save')
    } else {
      res.status(200)
      const insertId = await usersRepository.saveUser(user)
      res.send(`Usuario con id ${insertId} guardado y pendiente de verificar`)
    }
}

module.exports = register