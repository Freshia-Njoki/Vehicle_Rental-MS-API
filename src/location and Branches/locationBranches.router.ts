import { Hono } from "hono";
import { listOrderMenuItems, getOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem, getMenuOrdersInfo } from "./locationBranches.controller"
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemSchema } from "../validators";
import { adminRoleAuth,userRoleAuth, userOrAdminRoleAuth } from "../middleware/bearAuth";
export const orderMenuItemRouter = new Hono();

//get all OrderMenuItems      api/OrderMenuItems
orderMenuItemRouter.get("/orderMenuItems",userOrAdminRoleAuth, listOrderMenuItems);
//get a single OrderMenuItem    api/OrderMenuItems/1
orderMenuItemRouter.get("/orderMenuItems/:id",adminRoleAuth, getOrderMenuItem)
// create a OrderMenuItem 
orderMenuItemRouter.post("/orderMenuItems",userRoleAuth, zValidator('json', orderMenuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createOrderMenuItem)
//update a OrderMenuItem
orderMenuItemRouter.put("/orderMenuItems/:id",userRoleAuth, updateOrderMenuItem)

orderMenuItemRouter.delete("/orderMenuItems/:id",userRoleAuth, deleteOrderMenuItem)
orderMenuItemRouter.get("/menuOrdersInfo",userOrAdminRoleAuth, getMenuOrdersInfo)

//https:domai.com/api/OrderMenuItems?limit=10