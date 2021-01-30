const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const Log = new mongoose.Schema(
  {
    timestamp: Date,
    level: String,
    message: String,
    meta: mongoose.Schema.Types.Mixed
  }
)

Log.plugin(paginate)

module.exports = mongoose.model('Log', Log)
