import { Context } from "hono";
import { CustomerSupportTicketService, getCustomerSupportTicketService, createCustomerSupportTicketService, updateCustomerSupportTicketService, deleteCustomerSupportTicketService, getMoreCustomerSupportTicketInfoService} from "./customerSupportTickets.service";

export const listCustomerSupportTicket = async (c: Context) => {
    try {
        //limit the number of CustomerSupportTicket s to be returned

        const limit = Number(c.req.query('limit'))

        const data = await CustomerSupportTicketService(limit);
        if (data == null || data.length == 0) {
            return c.text("CustomerSupportTicket  not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCustomerSupportTicket  = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const CustomerSupportTicket  = await getCustomerSupportTicketService(id);
    if (CustomerSupportTicket  == undefined) {
        return c.text("CustomerSupportTicket  not found", 404);
    }
    return c.json(CustomerSupportTicket , 200);
}
export const createCustomerSupportTicket  = async (c: Context) => {
    try {
        const CustomerSupportTicket  = await c.req.json();
        const createdCustomerSupportTicket  = await createCustomerSupportTicketService(CustomerSupportTicket );


        if (!createdCustomerSupportTicket ) return c.text("CustomerSupportTicket  not created", 404);
        return c.json({ msg: createdCustomerSupportTicket  }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCustomerSupportTicket  = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const CustomerSupportTicket  = await c.req.json();
    try {
        // search for the CustomerSupportTicket 
        const searchedCustomerSupportTicket  = await getCustomerSupportTicketService(id);
        if (searchedCustomerSupportTicket  == undefined) return c.text("CustomerSupportTicket  not found", 404);
        // get the data and update it
        const res = await updateCustomerSupportTicketService(id, CustomerSupportTicket );
        // return a success message
        if (!res) return c.text("CustomerSupportTicket  not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCustomerSupportTicket  = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the CustomerSupportTicket 
        const CustomerSupportTicket  = await getCustomerSupportTicketService(id);
        if (CustomerSupportTicket  == undefined) return c.text("CustomerSupportTicket  not found", 404);
        //deleting the CustomerSupportTicket 
        const res = await deleteCustomerSupportTicketService(id);
        if (!res) return c.text("CustomerSupportTicket  not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getMoreCustomerSupportTicketInfo = async(c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const CustomerSupportTicketInfo = await getMoreCustomerSupportTicketInfoService(id);
    if (CustomerSupportTicketInfo == undefined) {
        return c.text("CustomerSupportTicket  not found", 404);
    }
    return c.json(CustomerSupportTicketInfo, 200);
}