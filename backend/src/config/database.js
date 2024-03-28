const { getConfig } = require('.')

const defaultSettings = {
  dialect: 'postgres',
  host: process.env.DATABASE_URL,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}

module.exports = getConfig({
  production: defaultSettings,
  test: defaultSettings,
  development: defaultSettings
})
