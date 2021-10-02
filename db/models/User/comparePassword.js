const bcrypt = require('bcrypt')

function comparePassword (candidatePassword) {
  // returns promise, can `await user.comparePassword()`
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = {
  comparePassword
}
