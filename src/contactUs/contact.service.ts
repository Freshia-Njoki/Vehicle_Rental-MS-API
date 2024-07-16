import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIContact, TSContact, ContactUsTable } from "../drizzle/schema";

export const contactService = async (limit?: number): Promise<TSContact[] | null> => {
    try {
        if (limit) {
            return await db.query.ContactUsTable.findMany({
                limit: limit
            });
        }
        return await db.query.ContactUsTable.findMany();
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return null;
    }
};

export const getContactService = async (id: number): Promise<TIContact> => {
    try {
        return await db.query.ContactUsTable.findFirst({
            where: eq(ContactUsTable.id, id)
        });
    } catch (error) {
        console.error(`Error fetching contact with id ${id}:`, error);
        return undefined;
    }
};

export const createContactService = async (contact: TIContact) => {
    try {
        await db.insert(ContactUsTable).values(contact).execute();
        return "Contact created successfully";
    } catch (error) {
        console.error("Error creating contact:", error);
        throw new Error("Failed to create contact");
    }
};

export const updateContactService = async (id: number, contact: TIContact) => {
    try {
        await db.update(ContactUsTable).set(contact).where(eq(ContactUsTable.id, id)).execute();
        return "Contact updated successfully";
    } catch (error) {
        console.error(`Error updating contact with id ${id}:`, error);
        throw new Error("Failed to update contact");
    }
};

export const deleteContactService = async (id: number) => {
    try {
        await db.delete(ContactUsTable).where(eq(ContactUsTable.id, id)).execute();
        return "Contact deleted successfully";
    } catch (error) {
        console.error(`Error deleting contact with id ${id}:`, error);
        throw new Error("Failed to delete contact");
    }
};
