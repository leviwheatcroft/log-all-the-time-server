const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const entrySchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  date: Date,
  project: String,
  description: String
}, { timestamps: true })

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry
