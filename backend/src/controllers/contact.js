const { contactSchema } = require("../schemas/contact")
const { ContactService } = require("../services/index")
const logger = require('../lib/logger')

const create = async (req, res, next) => {
  try {
    const { error: errorJoi, value } = contactSchema.validate(req.body, { allowUnknown: true, abortEarly: false })

    if (errorJoi) {
      logger.error({
        message: 'Validation error while creating contact'
      })

      throw new Error('Bad Request Error')
    }

    const createdContact = await ContactService.createContact(value)

    return res.status(201).json(createdContact)

  } catch (error) {
    return next(error)
  }
}

module.exports = { create }
