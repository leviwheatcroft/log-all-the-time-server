const {
  readFileSync
} = require('fs')

const wordsRaw = readFileSync(`${__dirname}/words.txt`, 'utf8')
const wordsSplit = wordsRaw.split(' ')
wordsSplit.pop()
const wordsUnique = wordsSplit.filter((w, i) => {
  return i === wordsSplit.findIndex(((_w) => w === _w))
})

function* _uniqueRandomWord (first = false) {
  if (first)
    yield first
  const initialIdx = Math.floor(Math.random() * wordsUnique.length)
  let idx = initialIdx + 1
  while (idx !== initialIdx) {
    if (idx > wordsUnique.length - 1)
      idx = 0
    yield wordsUnique[idx]
    idx += 1
  }
  throw new RangeError('No more unique random words')
}

function uniqueRandomWords (count) {
  const uniqueRandomWord = _uniqueRandomWord()
  const words = []
  for (let i = 0; i < count; i += 1)
    words.push(uniqueRandomWord.next().value)
  return words
}

function randomWord () {
  const idx = Math.floor(Math.random() * wordsUnique.length)
  return wordsUnique[idx]
}

function randomWords (count) {
  const idx = Math.floor(Math.random() * (wordsSplit.length - count - 1))
  return wordsSplit.slice(idx, idx + count).join(' ')
}

module.exports = {
  randomWord,
  randomWords,
  _uniqueRandomWord,
  uniqueRandomWords
}
