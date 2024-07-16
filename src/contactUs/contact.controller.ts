import { Context } from "hono";
import { contactService, getContactService, createContactService, updateContactService, deleteContactService,} from "./contact.service";

export const listContact = async (c: Context) => {
    try {
        //limit the number of Contact to be returned

        const limit = Number(c.req.query('limit'))

        const data = await contactService(limit);
        if (data == null || data.length == 0) {
            return c.text("Contact not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getContact = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Contact = await getContactService(id);
    if (Contact == undefined) {
        return c.text("Contact not found", 404);
    }
    return c.json(Contact, 200);
}

export const createContact = async (c: Context) => {
    try {
        const Contact = await c.req.json();
        const createdContact = await createContactService(Contact);


        if (!createdContact) return c.text("Contact not created", 404);
        return c.json({ msg: createdContact }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateContact = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Contact = await c.req.json();
    try {
        // search for the Contact
        const searchedContact = await getContactService(id);
        if (searchedContact == undefined) return c.text("Contact not found", 404);
        // get the data and update it
        const res = await updateContactService(id, Contact);
        // return a success message
        if (!res) return c.text("Contact not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteContact = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Contact
        const Contact = await getContactService(id);
        if (Contact == undefined) return c.text("Contact not found", 404);
        //deleting the Contact
        const res = await deleteContactService(id);
        if (!res) return c.text("Contact not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
