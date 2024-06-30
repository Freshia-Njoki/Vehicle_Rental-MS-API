import { Hono } from "hono";
import { listCategories, getCategory, createCategory, updateCategory, deleteCategory, filterCategoryInfo } from "./category.controller"
import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../validators";
import { adminRoleAuth,userOrAdminRoleAuth,userRoleAuth } from "../middleware/bearAuth";
export const categoryRouter = new Hono();

//get all categorys      api/categorys
categoryRouter.get("/category",userOrAdminRoleAuth, listCategories);
//get a single category    api/categorys/1
categoryRouter.get("/category/:id",userOrAdminRoleAuth, getCategory)
// create a category 
categoryRouter.post("/category",adminRoleAuth, zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createCategory)
//update a category
categoryRouter.put("/category/:id",adminRoleAuth, updateCategory)

categoryRouter.delete("/category/:id",adminRoleAuth, deleteCategory)
categoryRouter.get("/categoryInfo/:id",userOrAdminRoleAuth, filterCategoryInfo)

//https:domai.com/api/categorys?limit=10