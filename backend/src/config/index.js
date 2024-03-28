const environment = process.env.NODE_ENV || 'test'

const getConfig = (configs) => {
  return configs[environment]
}

module.exports = { getConfig }
