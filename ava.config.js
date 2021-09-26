// https://github.com/avajs/ava/blob/main/docs/06-configuration.md

export default {
  files: [
    // 'test/001 queries/*.js',
    'test/001 queries/001.003*.js',
    // 'test/002 mutations/002.001*.js',
    // 'test/002 mutations/002.002*.js',
    // 'test/002 mutations/002.003*.js',
  ],
  environmentVariables: {
    JWT_SECRET: 'secretJwtEncryptionKey',
    JWT_ACCESS_TOKEN_EXPIRY: '900000',
    JWT_REFRESH_TOKEN_EXPIRY: '604800000',
    LOG_LEVEL_CONSOLE: 'verbose',
    LOG_LEVEL_DB: 'verbose',
    SEQUELIZE_DIALECT: 'sqlite',
    SEQUELIZE_STORAGE: ':memory:'
  },
  concurrency: 5,
  verbose: true
}
