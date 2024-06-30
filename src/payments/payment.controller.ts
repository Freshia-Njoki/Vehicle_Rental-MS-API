import { Context } from "hono";
import { menuItemService, getmenuItemService, getActiveMenuItemsService, createmenuItemService, updatemenuItemService, deletemenuItemService, getMoreMenuInfoService } from "./payment.service";

export const listmenuItem = async (c: Context) => {
    try {
        //limit the number of menuItem to be returned

        const limit = Number(c.req.query('limit'))

        const data = await menuItemService(limit);
        if (data == null || data.length == 0) {
            return c.text("Menu not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getMenu = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Menu = await getmenuItemService(id);
    if (Menu == undefined) {
        return c.text("Menu not found", 404);
    }
    return c.json(Menu, 200);
}
export const createMenu = async (c: Context) => {
    try {
        const Menu = await c.req.json();
        const createdMenu = await createmenuItemService(Menu);


        if (!createdMenu) return c.text("Menu not created", 404);
        return c.json({ msg: createdMenu }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateMenu = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Menu = await c.req.json();
    try {
        // search for the Menu
        const searchedMenu = await getmenuItemService(id);
        if (searchedMenu == undefined) return c.text("Menu not found", 404);
        // get the data and update it
        const res = await updatemenuItemService(id, Menu);
        // return a success message
        if (!res) return c.text("Menu not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteMenu = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Menu
        const Menu = await getmenuItemService(id);
        if (Menu == undefined) return c.text("Menu not found", 404);
        //deleting the Menu
        const res = await deletemenuItemService(id);
        if (!res) return c.text("Menu not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


export const listActiveMenuItems = async (c: Context) => {
    const data = await getActiveMenuItemsService();
    if (!data) return c.text("No active menu items found", 404);

    return c.json(data, 200);
};

export const getMoreMenuInfo = async(c:Context) => {
    const menuInfo = await getMoreMenuInfoService();
    if (menuInfo == undefined) {
        return c.text("menuInfo not found", 404);
    }
    return c.json(menuInfo, 200);
}