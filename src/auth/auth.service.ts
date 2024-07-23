import { AuthTable, TIAuthOnUser, TSAuthOnUser } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuthOnUser): Promise<string | null> => {
    await db.insert(AuthTable).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuthOnUser) => {
    const { username, password } = user;
    return await db.query.AuthTable.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        }, where: sql` ${AuthTable.username} = ${username}`,
        with: {
            user: {
                columns: {
                    full_name: true,
                    address: true,
                    id: true
                }
            }
        }
    })
}