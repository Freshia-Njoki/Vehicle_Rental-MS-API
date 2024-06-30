import { Hono } from "hono";
import { listCustomerSupportTicket, getCustomerSupportTicket , createCustomerSupportTicket , updateCustomerSupportTicket , deleteCustomerSupportTicket , getMoreCustomerSupportTicketInfo } from "./customerSupportTickets.controller"
import { zValidator } from "@hono/zod-validator";
import { customerSupportTicketSchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";
export const customerSupportTicketRouter = new Hono();

//get all CustomerSupportTicket       api/CustomerSupportTicket 
customerSupportTicketRouter.get("/customerSupportTickets", listCustomerSupportTicket);
//get a single CustomerSupportTicket     api/CustomerSupportTicket /1
customerSupportTicketRouter.get("/customerSupportTickets/:id", getCustomerSupportTicket )
// create a CustomerSupportTicket  
customerSupportTicketRouter.post("/customerSupportTickets",zValidator('json', customerSupportTicketSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createCustomerSupportTicket )
//update a CustomerSupportTicket 
customerSupportTicketRouter.put("/customerSupportTickets/:id",updateCustomerSupportTicket )

customerSupportTicketRouter.delete("/customerSupportTickets/:id", deleteCustomerSupportTicket )
customerSupportTicketRouter.get("/customerSupportTicketsInfo/:id", getMoreCustomerSupportTicketInfo)

