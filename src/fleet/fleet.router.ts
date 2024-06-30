import { Hono } from "hono";
import { listOrders, getOrder, createOrder, updateOrder, deleteOrder,filterOrderInfo,getMoreOrderInfo} from "./fleet.controller"
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validators";
import { adminRoleAuth,userRoleAuth, userOrAdminRoleAuth } from "../middleware/bearAuth";
export const ordersRouter = new Hono();

//get all Orders     api/Orders
ordersRouter.get("/orders",adminRoleAuth, listOrders);
//get a single Orders    api/Orders/1
ordersRouter.get("/orders/:id",userOrAdminRoleAuth, getOrder)
// create a Orders 
ordersRouter.post("/orders",adminRoleAuth, zValidator('json', orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createOrder)
//update  Orders
ordersRouter.put("/orders/:id",adminRoleAuth, updateOrder)

ordersRouter.delete("/orders/:id",adminRoleAuth, deleteOrder)
ordersRouter.get("/filterOrderInfo/:id",userRoleAuth, filterOrderInfo)
ordersRouter.get("/OrderInfo",userOrAdminRoleAuth, getMoreOrderInfo)

