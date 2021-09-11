function midnightUtc (date) {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0
  ))
}

module.exports = {
  midnightUtc
}
