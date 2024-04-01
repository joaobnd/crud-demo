import { ContactDTO } from "../validation/contact.dto";
import prismaClient from "../prisma";
import { LogLevel, logMessage } from "../lib/logger";

class ContactService {
  async create(contact: ContactDTO) {
    try {
      const contactCreated = await prismaClient.contact.create({
        data: {
          name: contact.name,
          phone: contact.phone,
          street: contact.street,
          number: contact.number,
          neighborhood: contact.neighborhood,
          city: contact.city,
          state: contact.state
        }
      });

      logMessage(LogLevel.INFO, 'Contact created successfuly');

      return { ...contactCreated };

    } catch (error) {

      logMessage(LogLevel.ERROR, 'Cannot create an contact', { additionalData: error.message });
      throw Error('Error while creating a contact.')
    }
  };

  async edit(updateData: Partial<ContactDTO>, id: number) {
    try {
      const contactEdited = await prismaClient.contact.update({
        where: { id },
        data: updateData
      });

      logMessage(LogLevel.INFO, 'Contact edited successfuly');

      return { ...contactEdited };

    } catch (error) {

      logMessage(LogLevel.ERROR, 'Cannot edit an contact', { additionalData: error.message });
      throw Error('Error while editing a contact.')
    };
  };

  async delete(id: number) {
    try {
      const contactDeleted = await prismaClient.contact.delete({
        where: { id }
      });

      logMessage(LogLevel.INFO, 'Contact deleted successfuly');

      return { ...contactDeleted };

    } catch (error) {
      logMessage(LogLevel.ERROR, 'Cannot delete an contact.', { additionalData: error.message });
      throw new Error('Error while deleting a contact.');
    };
  };

  async getAll() {
    try {
      const contacts = await prismaClient.contact.findMany();

      logMessage(LogLevel.INFO, 'Contact list received successfully.');

      return { ...contacts }

    } catch (error) {
      logMessage(LogLevel.ERROR, 'Cannot get contact list.', { additionalData: error.message });
      throw new Error('Error while getting contact list.');
    }
  };

  async getContact(id: number) {
    try {
      const contact = await prismaClient.contact.findUnique({
        where: { id }
      });

      logMessage(LogLevel.INFO, 'Contact received successfully.');

      return { ...contact }

    } catch (error) {
      logMessage(LogLevel.ERROR, 'Cannot get contact.', { additionalData: error.message });
      throw new Error('Error while getting contact.');
    }
  };
};

export default ContactService;