const { DataTypes } = require('sequelize')

const attributes = {
  id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSON,
    allowNull: false
  }
}

const options = {
  tableName: 'Contact',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true
}

const create = (db) => db.define('Contact', attributes, options)

module.exports = { create }
