import { Hono } from "hono";
import { listContact, getContact, createContact, updateContact, deleteContact } from "./contact.controller"
import { zValidator } from "@hono/zod-validator";
import { contactSchema } from "../validators";
import { adminRoleAuth,userOrAdminRoleAuth,userRoleAuth } from "../middleware/bearAuth";
export const ContactRouter = new Hono();


ContactRouter.get("/Contact", listContact);

ContactRouter.get("/Contact/:id", userRoleAuth, getContact)

ContactRouter.post("/Contact", zValidator('json', contactSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createContact)

ContactRouter.put("/Contact/:id", updateContact)

ContactRouter.delete("/Contact/:id",  deleteContact)
// ContactRouter.get("/ContactInfo",userOrAdminRoleAuth, getMoreContactInfo)

