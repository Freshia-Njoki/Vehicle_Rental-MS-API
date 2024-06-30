import { eq, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {
  TICustomerSupportTicket,
  TSCustomerSupportTicket,
  CustomerSupportTicketsTable
} from "../drizzle/schema";

export const CustomerSupportTicketService = async (limit?: number): Promise<TSCustomerSupportTicket[] | null> => {
  if (limit) {
    return await db.query.CustomerSupportTicketsTable.findMany({
      limit: limit,
    });
  }
  return await db.query.CustomerSupportTicketsTable.findMany();
};

export const getCustomerSupportTicketService = async (
  id: number
): Promise<TICustomerSupportTicket | undefined> => {
  return await db.query.CustomerSupportTicketsTable.findFirst({
    where: eq(CustomerSupportTicketsTable.id, id),
  });
};

export const createCustomerSupportTicketService = async (CustomerSupportTicket : TICustomerSupportTicket) => {
  await db.insert(CustomerSupportTicketsTable).values(CustomerSupportTicket );
  return "CustomerSupportTicket  created successfully";
};

export const updateCustomerSupportTicketService = async (id: number, CustomerSupportTicket : TICustomerSupportTicket) => {
  await db.update(CustomerSupportTicketsTable).set(CustomerSupportTicket ).where(eq(CustomerSupportTicketsTable.id, id));
  return "CustomerSupportTicket  updated successfully";
};

export const deleteCustomerSupportTicketService = async (id: number) => {
  await db.delete(CustomerSupportTicketsTable).where(eq(CustomerSupportTicketsTable.id, id));
  return "CustomerSupportTicket  deleted successfully";
};

export const getMoreCustomerSupportTicketInfoService = async (id: number) => {
  return await db.query.CustomerSupportTicketsTable.findMany({
    columns: {
      description:true,
      status:true,
      subject:true
    },
    with: {
      user : {
        columns: {
          full_name: true
        },
        with: {
          booking : {
            columns: {
              booking_status:true,
              return_date:true
            }
          }
        }
      }
    },
  });


}
