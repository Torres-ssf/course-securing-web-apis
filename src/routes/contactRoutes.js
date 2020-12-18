import { Router } from "express";
import { ContactController } from "../controllers/ContactController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const contactController = new ContactController();

export const contactRoutes = Router();

contactRoutes.use(ensureAuthentication);

contactRoutes.get("/contacts", contactController.get);

contactRoutes.post("/contacts", contactController.create);

contactRoutes.get("/contact/:contactId", contactController.getContactWithID);

contactRoutes.put("/contact/:contactId", contactController.update);

contactRoutes.delete("/contact/:contactId", contactController.delete);
