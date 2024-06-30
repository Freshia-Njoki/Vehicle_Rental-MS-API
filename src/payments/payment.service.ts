import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIMenuItem, TSMenuItem, MenuItemsTable } from "../drizzle/schema";

export const menuItemService = async (limit?: number): Promise<TSMenuItem[] | null> => {
    if (limit) {
        return await db.query.MenuItemsTable.findMany({
            limit: limit
        });
    }
    return await db.query.MenuItemsTable.findMany();
}

export const getmenuItemService = async (id: number): Promise<TIMenuItem | undefined> => {
    return await db.query.MenuItemsTable.findFirst({
        where: eq(MenuItemsTable.id, id)
    })
}

export const createmenuItemService = async (menu: TIMenuItem) => {
    await db.insert(MenuItemsTable).values(menu)
    return "menu created successfully";
}

export const updatemenuItemService = async (id: number, menu: TIMenuItem) => {
    await db.update(MenuItemsTable).set(menu).where(eq(MenuItemsTable.id, id))
    return "menu updated successfully";
}

export const deletemenuItemService = async (id: number) => {
    await db.delete(MenuItemsTable).where(eq(MenuItemsTable.id, id))
    return "menu deleted successfully";
}


//extend functions
// Fetch all active menu items
export const getActiveMenuItemsService = async (): Promise<TSMenuItem[] | null> => {
    return await db.query.MenuItemsTable.findMany({
        where: eq(MenuItemsTable.active, true)
    });
};

export const getMoreMenuInfoService = async () => {
    return await db.query.MenuItemsTable.findMany({
      columns: {
        description: true
      },
      with: {
        restaurant: {
          columns: {
            name: true
          },
          with: {
            menu_item:{
                columns:{
                    order_menu_item:true
                }
            },
            orders: {
              columns: {final_price:true
              }
            }
          }
        }
      },
    });
  
  
  }
  