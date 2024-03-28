const Sequelize = require('sequelize')

const config = require('../config/database')

const rawModels = require('/models')

const initializeDb = () => {
  const db = new Sequelize(config)

  const createInstance = (model) => {
    return {
      model,
      instance: model.create(db)
    }
  }

  const associateModels = (param) => {
    const { model, instance } = param

    if (model.associate) {
      model.associate(instance, db.models)
    }
  }

  Object.values(rawModels).map(createInstance).map(associateModels)
  return db
}

module.exports = initializeDb()
