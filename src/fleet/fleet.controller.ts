import { Context } from "hono";
import { OrdersService, getOrderService, createOrderService, updateOrderService, deleteOrderService, filterOrderService, getMoreOrdersInfoService } from "./fleet.service";

export const listOrders = async (c: Context) => {
    try {
        //limit the number of Orders to be returned

        const limit = Number(c.req.query('limit'))

        const data = await OrdersService(limit);
        if (data == null || data.length == 0) {
            return c.text("Order not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getOrder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Order = await getOrderService(id);
    if (Order == undefined) {
        return c.text("Order not found", 404);
    }
    return c.json(Order, 200);
}
export const createOrder = async (c: Context) => {
    try {
        const Order = await c.req.json();
        const createdOrder = await createOrderService(Order);


        if (!createdOrder) return c.text("Order not created", 404);
        return c.json({ msg: createdOrder }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOrder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Order = await c.req.json();
    try {
        // search for the Order
        const searchedOrder = await getOrderService(id);
        if (searchedOrder == undefined) return c.text("Order not found", 404);
        // get the data and update it
        const res = await updateOrderService(id, Order);
        // return a success message
        if (!res) return c.text("Order not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteOrder = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Order
        const Order = await getOrderService(id);
        if (Order == undefined) return c.text("Order not found", 404);
        //deleting the Order
        const res = await deleteOrderService(id);
        if (!res) return c.text("Order not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const filterOrderInfo = async(c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderInfo = await filterOrderService(id);
    if (orderInfo == undefined) {
        return c.text("Order not found", 404);
    }
    return c.json(orderInfo, 200);
}

export const getMoreOrderInfo = async(c:Context) => {

    const ordersInfo = await getMoreOrdersInfoService();
    if (ordersInfo == undefined) {
        return c.text("ordersInfo not found", 404);
    }
    return c.json(ordersInfo, 200);
}