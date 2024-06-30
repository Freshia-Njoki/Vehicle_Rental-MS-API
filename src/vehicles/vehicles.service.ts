import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICategory, TSCategory, CategoryTable, MenuItemsTable } from "../drizzle/schema";

export const CategoryService = async (limit?: number): Promise<TSCategory[] | null> => {
    if (limit) {
        return await db.query.CategoryTable.findMany({
            limit: limit
        });
    }
    return await db.query.CategoryTable.findMany();
}

export const getCategoryService = async (id: number): Promise<TICategory | undefined> => {
    return await db.query.CategoryTable.findFirst({
        where: eq(CategoryTable.id, id)
    })
}

export const createCategoryService = async (Category: TICategory) => {
    await db.insert(CategoryTable).values(Category)
    return "Category created successfully";
}

export const updateCategoryService = async (id: number, Category: TICategory) => {
    await db.update(CategoryTable).set(Category).where(eq(CategoryTable.id, id))
    return "Category updated successfully";
}

export const deleteCategoryService = async (id: number) => {
    await db.delete(CategoryTable).where(eq(CategoryTable.id, id))
    return "Category deleted successfully";
}


export const filterCategoryService = async (id: number) => {
    return await db.select({
        CategoryName: CategoryTable.name,
        MenuItem: MenuItemsTable.description
    }).from(CategoryTable).rightJoin(MenuItemsTable, eq(CategoryTable.id, MenuItemsTable.category_id))
}