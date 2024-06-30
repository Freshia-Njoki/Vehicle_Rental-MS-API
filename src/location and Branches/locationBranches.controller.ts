import { Context } from "hono";
import { OrderMenuItemsService, getOrderMenuItemService, createOrderMenuItemService, updateOrderMenuItemService, deleteOrderMenuItemService,getMoreMenuOrdersInfoService } from "./locationBranches.service";

export const listOrderMenuItems = async (c: Context) => {
    try {
        //limit the number of OrderMenuItems to be returned

        const limit = Number(c.req.query('limit'))

        const data = await OrderMenuItemsService(limit);
        if (data == null || data.length == 0) {
            return c.text("OrderMenuItem not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getOrderMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const OrderMenuItem = await getOrderMenuItemService(id);
    if (OrderMenuItem == undefined) {
        return c.text("OrderMenuItem not found", 404);
    }
    return c.json(OrderMenuItem, 200);
}
export const createOrderMenuItem = async (c: Context) => {
    try {
        const OrderMenuItem = await c.req.json();
        const createdOrderMenuItem = await createOrderMenuItemService(OrderMenuItem);


        if (!createdOrderMenuItem) return c.text("OrderMenuItem not created", 404);
        return c.json({ msg: createdOrderMenuItem }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOrderMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const OrderMenuItem = await c.req.json();
    try {
        // search for the OrderMenuItem
        const searchedOrderMenuItem = await getOrderMenuItemService(id);
        if (searchedOrderMenuItem == undefined) return c.text("OrderMenuItem not found", 404);
        // get the data and update it
        const res = await updateOrderMenuItemService(id, OrderMenuItem);
        // return a success message
        if (!res) return c.text("OrderMenuItem not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteOrderMenuItem = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the OrderMenuItem
        const OrderMenuItem = await getOrderMenuItemService(id);
        if (OrderMenuItem == undefined) return c.text("OrderMenuItem not found", 404);
        //deleting the OrderMenuItem
        const res = await deleteOrderMenuItemService(id);
        if (!res) return c.text("OrderMenuItem not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getMenuOrdersInfo = async(c:Context) => {

    const menuOrdersInfo = await getMoreMenuOrdersInfoService();
    if (menuOrdersInfo == undefined) {
        return c.text("driversInfo not found", 404);
    }
    return c.json(menuOrdersInfo, 200);
}