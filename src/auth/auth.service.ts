import { AuthTable, TIAuthOnUser, TSAuthOnUser, TSUser } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuthOnUser): Promise<string | null> => {
    await db.insert(AuthTable).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuthOnUser) => {
    const { user_id, password } = user;
    return await db.query.AuthTable.findFirst({
        where: sql`${AuthTable.user_id} = ${user_id}`,
        columns: {
            user_id: true,
            password: true
        },
        with: {
            user: {
                columns: {
                    full_name: true,
                    email: true,
                    address: true,
                    role:true
                }
            }
        }
    })

}