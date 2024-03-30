const models = require("../models")

const { Contact } = models

const create = async (payload) => Contact.create(payload)

const getContactById = async (id) => Contact.findOne({
  where: {
    id
  }
})

module.exports = { create, getContactById }
