import { Context } from "hono";
import { CategoryService, getCategoryService, createCategoryService, updateCategoryService, deleteCategoryService, filterCategoryService } from "./vehicles.service";

export const listCategories = async (c: Context) => {
    try {
        //limit the number of Categorys to be returned

        const limit = Number(c.req.query('limit'))

        const data = await CategoryService(limit);
        if (data == null || data.length == 0) {
            return c.text("Category not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCategory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Category = await getCategoryService(id);
    if (Category == undefined) {
        return c.text("Category not found", 404);
    }
    return c.json(Category, 200);
}
export const createCategory = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCategory = await createCategoryService(Category);


        if (!createdCategory) return c.text("Category not created", 404);
        return c.json({ msg: createdCategory }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCategory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Category = await c.req.json();
    try {
        // search for the Category
        const searchedCategory = await getCategoryService(id);
        if (searchedCategory == undefined) return c.text("Category not found", 404);
        // get the data and update it
        const res = await updateCategoryService(id, Category);
        // return a success message
        if (!res) return c.text("Category not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCategory = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Category
        const Category = await getCategoryService(id);
        if (Category == undefined) return c.text("Category not found", 404);
        //deleting the Category
        const res = await deleteCategoryService(id);
        if (!res) return c.text("Category not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const filterCategoryInfo = async(c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const categoryInfo = await filterCategoryService(id);
    if (categoryInfo == undefined) {
        return c.text("Order not found", 404);
    }
    return c.json(categoryInfo, 200);
}