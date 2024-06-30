import { Hono } from "hono";
import { listmenuItem, getMenu, createMenu, updateMenu, deleteMenu, listActiveMenuItems, getMoreMenuInfo} from "./payment.controller"
import { zValidator } from "@hono/zod-validator";
import { menuItemSchema } from "../validators";
import { adminRoleAuth,userOrAdminRoleAuth } from "../middleware/bearAuth";
export const menuRouter = new Hono();

//get all menuItem      api/menuItem
menuRouter.get("/menuItem",userOrAdminRoleAuth, listmenuItem);
//get a single Menu    api/menuItem/1
menuRouter.get("/menuItem/:id",userOrAdminRoleAuth, getMenu)
// create a Menu 
menuRouter.post("/menuItem",adminRoleAuth, zValidator('json', menuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createMenu)
//update a Menu
menuRouter.put("/menuItem/:id",adminRoleAuth, updateMenu)

menuRouter.delete("/menuItem/:id",adminRoleAuth, deleteMenu)
menuRouter.get("/activeMenuItems",userOrAdminRoleAuth, listActiveMenuItems)
menuRouter.get("/menuInfo",userOrAdminRoleAuth, getMoreMenuInfo)

//https:domai.com/api/menuItem?limit=10