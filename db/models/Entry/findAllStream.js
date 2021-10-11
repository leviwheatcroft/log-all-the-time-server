const { Readable } = require('stream')

class SequelizeStream extends Readable {
  constructor (options) {
    const {
      query,
      model,
      batchSize: limit = 64
    } = options
    super({
      ...options,
      highWaterMark: 64,
      objectMode: true
    })
    this.model = model
    this.query = query
    this.offset = 0
    this.limit = limit
  }

  // readable._construct is not available in node v14
  // async _construct (callback) {
  //   const {
  //     model,
  //     query
  //   } = this
  //   const count = await model.count(query)
  //   this.count = count
  //   console.log('got count', count)
  //   callback()
  // }

  async _read () {
    const {
      model,
      query,
      limit
    } = this
    let {
      offset,
      count
    } = this

    if (!count) {
      count = await model.count({ where: query.where })
      this.count = count
    }

    let bufferFull = false
    while (!bufferFull && offset < count) {
      if (offset === count) {
        this.push(null)
        // eslint-disable-next-line no-continue
        continue
      }
      const rows = await model.findAll({ ...query, offset, limit })
      offset += rows.length
      // eslint-disable-next-line no-return-assign, no-loop-func
      rows.forEach((r) => bufferFull = this.push(r))
    }
    if (offset === count)
      this.push(null)

    this.offset = offset
  }
}

async function findAllStream (query, ctx) {
  const model = this
  const stream = new SequelizeStream({
    query,
    model
  })
  return stream
}

module.exports = { findAllStream }
