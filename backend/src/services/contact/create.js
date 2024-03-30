const logger = require('../../lib/logger')
const contactRepository = require('../../database/repositories')

const createContact = async (data) => {
  try {

    const result = await contactRepository.createContact(data)

    logger.info({
      message: 'Contact created successfuly',
      result
    })

    return result

  } catch (error) {
    logger.error({
      message: 'Cannot create an contact',
      error: error.message
    })

    throw error

  }
}

module.exports = { createContact }
