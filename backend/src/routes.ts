import { Router } from "express";
import ContactController from "./controllers/contact.controller"

const router = Router();

const contactController = new ContactController();

router.get("/_health_check", (_, res) => res.sendStatus(200));
router.get("/contact", contactController.getAll);
router.get("/contact/id", contactController.getContact);
router.post("/contact", contactController.create);
router.put('/contact/:id', contactController.edit);
router.delete('/contact/:id', contactController.delete);

export { router };