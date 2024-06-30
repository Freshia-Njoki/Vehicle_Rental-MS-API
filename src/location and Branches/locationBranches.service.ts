import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrderMenuItem, TSOrderMenuItem, OrderMenuItemsTable } from "../drizzle/schema";

export const OrderMenuItemsService = async (limit?: number): Promise<TSOrderMenuItem[] | null> => {
    if (limit) {
        return await db.query.OrderMenuItemsTable.findMany({
            limit: limit
        });
    }
    return await db.query.OrderMenuItemsTable.findMany();
}

export const getOrderMenuItemService = async (id: number): Promise<TIOrderMenuItem | undefined> => {
    return await db.query.OrderMenuItemsTable.findFirst({
        where: eq(OrderMenuItemsTable.id, id)
    })
}

export const createOrderMenuItemService = async (OrderMenuItem: TIOrderMenuItem) => {
    await db.insert(OrderMenuItemsTable).values(OrderMenuItem)
    return "OrderMenuItem created successfully";
}

export const updateOrderMenuItemService = async (id: number, OrderMenuItem: TIOrderMenuItem) => {
    await db.update(OrderMenuItemsTable).set(OrderMenuItem).where(eq(OrderMenuItemsTable.id, id))
    return "OrderMenuItem updated successfully";
}

export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(OrderMenuItemsTable).where(eq(OrderMenuItemsTable.id, id))
    return "OrderMenuItem deleted successfully";
}

export const getMoreMenuOrdersInfoService = async () => {
    return await db.query.OrderMenuItemsTable.findMany({
      columns: {
        menu_item: true,
        price: true
      },
      with: {
        orders: {
          columns: {
            order_status: true
          },
          with: {
            comment : {
              columns: {
               is_praise: true
              }
            }
          }
        }
      },
    });
  
  
  }
  