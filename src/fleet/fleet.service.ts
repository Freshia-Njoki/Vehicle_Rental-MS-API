import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrder, TSOrder, OrdersTable, OrderStatusTable } from "../drizzle/schema";

export const OrdersService = async (limit?: number): Promise<TSOrder[] | null> => {
    if (limit) {
        return await db.query.OrdersTable.findMany({
            limit: limit
        });
    }
    return await db.query.OrdersTable.findMany();
}

export const getOrderService = async (id: number): Promise<TIOrder | undefined> => {
    return await db.query.OrdersTable.findFirst({
        where: eq(OrdersTable.id, id)
    })
}

export const createOrderService = async (Order: TIOrder) => {
    await db.insert(OrdersTable).values(Order)
    return "Order created successfully";
}

export const updateOrderService = async (id: number, Order: TIOrder) => {
    await db.update(OrdersTable).set(Order).where(eq(OrdersTable.id, id))
    return "Order updated successfully";
}

export const deleteOrderService = async (id: number) => {
    await db.delete(OrdersTable).where(eq(OrdersTable.id, id))
    return "Order deleted successfully";
}


export const filterOrderService = async (id: number) => {
    return await db.select({
        order_menu_item: OrdersTable.order_menu_item,
        OrderStatusTable: OrderStatusTable.status_catalog
    }).from(OrdersTable).rightJoin(OrderStatusTable, eq(OrdersTable.id, OrderStatusTable.order_id))
}


export const getMoreOrdersInfoService = async () => {
    return await db.query.OrdersTable.findMany({
      columns: {
        created_at: true
      },
      with: {
        users: {
          columns: {
            contact_phone: true,
            confirmation_code: true
          },
          with: {
            order: {
              columns: {
               driver: true
              }
            }
          }
        }
      },
    });
  
  
  }
  