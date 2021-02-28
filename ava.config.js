// https://github.com/avajs/ava/blob/main/docs/06-configuration.md
export default {
  files: [
    'test/001 queries/*',
    'test/002 mutations/*'
  ],
  concurrency: 5,
  verbose: true
}
