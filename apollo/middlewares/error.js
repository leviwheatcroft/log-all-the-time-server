async function error (resolve, root, args, ctx, info) {
  let result
  // eslint-disable-next-line no-useless-catch
  try {
    result = await resolve(root, args, ctx, info)
  } catch (err) {
    // console.log(err)
    throw err
  }

  return result
}

const errorMap = {
  Query: error,
  Mutation: error
}

module.exports = {
  errorMap
}
