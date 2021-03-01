// https://github.com/avajs/ava/blob/main/docs/06-configuration.md
export default {
  files: [
    'test/001 queries/*.js',
    'test/002 mutations/*.js',
    'test/003 scalars/*.js'
  ],
  concurrency: 5,
  verbose: true
}
