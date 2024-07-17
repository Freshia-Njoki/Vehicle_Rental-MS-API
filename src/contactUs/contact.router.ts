import { Hono } from "hono";
import { listContact, getContact, createContact, updateContact, deleteContact } from "./contact.controller"
import { zValidator } from "@hono/zod-validator";
import { contactSchema } from "../validators";
import { adminRoleAuth,userOrAdminRoleAuth,userRoleAuth } from "../middleware/bearAuth";
export const contactRouter = new Hono();


contactRouter.get("/contact", listContact);

contactRouter.get("/contact/:id", getContact)

contactRouter.post("/contact", zValidator('json', contactSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createContact)

contactRouter.put("/contact/:id", updateContact)

contactRouter.delete("/contact/:id",  deleteContact)
// ContactRouter.get("/contactInfo",userOrAdminRoleAuth, getMoreContactInfo)

