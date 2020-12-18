import { Contact } from "../models/contactModel";

export class ContactController {
  async create(request, response) {
    const newContact = new Contact(request.body);

    try {
      await newContact.save();

      return response.json(newContact);
    } catch (error) {
      return response.status(500).json({ message: error });
    }
  }

  async get(request, response) {
    const contactExists = await Contact.find();

    return response.json(contactExists);
  }

  async getContactWithID(request, response) {
    const { contactId } = request.params;

    try {
      const contact = await Contact.findById(contactId);

      return response.json(contact);
    } catch (error) {
      return response.status(400).json({
        message: "no contact was found for the given id",
      });
    }
  }

  async update(request, response) {
    const { contactId } = request.params;

    try {
      await Contact.updateOne({ _id: contactId }, request.body);

      const contact = await Contact.findById(contactId);

      return response.json(contact);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async delete(request, response) {
    const { contactId } = request.params;

    try {
      await Contact.deleteOne({ _id: contactId });

      return response
        .status(204)
        .json({ message: "contact successfully deleted" });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "no contact found for the given id" });
    }
  }
}
