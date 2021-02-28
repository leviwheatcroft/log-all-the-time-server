const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const teamSchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true }
}, { timestamps: true })

const Team = mongoose.model('Team', teamSchema)

module.exports = Team
