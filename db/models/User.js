const bcrypt = require('bcrypt')
const crypto = require('crypto')
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  email: {
    type: String,
    unique: true,
    required: true
  },
  // avatarUrl: String,
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: { type: Boolean, default: true },
  username: {
    type: String,
    default () {
      return this.email.match(/^\w+/)[0]
    }
  }
  // basicGrant: { type: Boolean, default: true },
  // adminGrant: { type: Boolean, default: false },
  // organisation: { type: ObjectId, ref: 'Organisation' },
  // tokens: Array,
  // branch: String,
  // xero: {
  //   allTenants: Array,
  //   accessToken: {
  //     id_token: String,
  //     access_token: String,
  //     expires_at: Date,
  //     token_type: String,
  //     refresh_token: String,
  //     session_state: String
  //   }
  // }
}, { timestamps: true })

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save (next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword (
  candidatePassword,
  cb
) {
  // returns promise, can `await user.comparePassword()`
  return bcrypt.compare(candidatePassword, this.password)
}

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar (size) {
  if (!size) {
    size = 200
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

const User = mongoose.model('User', userSchema)

module.exports = User
