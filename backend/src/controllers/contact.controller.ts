import { Request, Response, NextFunction } from "express";
import contactSchema from "../schemas/contact.schema";
import { LogLevel, logMessage } from "../lib/logger";
import { ContactDTO } from "../validation/contact.dto"
import ContactService from "../services/contact.service";

class CreateAdminController {
  async create(req: Request, res: Response, next: NextFunction) {

    const { error: errorJoi, value } = contactSchema.validate(req.body, { allowUnknown: true, abortEarly: false });

    if (errorJoi) {
      logMessage(LogLevel.ERROR, 'Validation error while creating contact.');

      throw new Error('Bad Request Error')
    };

    const contactDTO: ContactDTO = req.body;

    const contactService = new ContactService();

    const result = await contactService.create(contactDTO);

    return res.status(201).json(result);
  };

  async edit(req: Request, res: Response, next: NextFunction) {

    const id = parseInt(req.params.id, 10);

    if (!id) {
      logMessage(LogLevel.ERROR, 'Validation error while editing contact: No ID provided.');

      throw new Error('Bad Request Error')
    };

    const contactDTO: Partial<ContactDTO> = req.body;

    const contactService = new ContactService();

    const result = await contactService.edit(contactDTO, id);

    return res.status(200).json(result);
  };

  async delete(req: Request, res: Response, next: NextFunction) {

    const id = parseInt(req.params.id, 10);

    if (!id) {
      logMessage(LogLevel.ERROR, 'Validation error while deleting contact: No ID provided.');

      throw new Error('Bad Request Error')
    };

    const contactService = new ContactService();

    const result = await contactService.delete(id);

    return res.status(200).json(result);
  };

  async getAll(_: Request, res: Response) {
    const contactService = new ContactService();

    const result = await contactService.getAll();

    return res.status(200).json(result);
  };

  async getContact(req: Request, res: Response, next: NextFunction) {

    const id = parseInt(req.params.id, 10);

    if (!id) {
      logMessage(LogLevel.ERROR, 'Validation error while deleting contact: No ID provided.');

      throw new Error('Bad Request Error')
    };

    const contactService = new ContactService();

    const result = await contactService.getContact(id);

    return res.status(200).json(result);
  };

}

export default CreateAdminController;
