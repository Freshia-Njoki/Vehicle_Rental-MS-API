import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIVehicle, TSVehicle, VehiclesTable } from "../drizzle/schema";

export const vehicleService = async (limit?: number): Promise<TSVehicle[] | null> => {
    if (limit) {
        return await db.query.VehiclesTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehiclesTable.findMany();
}

export const getVehicleService = async (id: number): Promise<TIVehicle | undefined> => {
    return await db.query.VehiclesTable.findFirst({
        where: eq(VehiclesTable.id, id)
    })
}

export const createVehicleService = async (Vehicle: TIVehicle) => {
    await db.insert(VehiclesTable).values(Vehicle)
    return "Vehicle created successfully";
}

export const updateVehicleService = async (id: number, Vehicle: TIVehicle) => {
    await db.update(VehiclesTable).set(Vehicle).where(eq(VehiclesTable.id, id))
    return "Vehicle updated successfully";
}

export const deleteVehicleService = async (id: number) => {
    await db.delete(VehiclesTable).where(eq(VehiclesTable.id, id))
    return "Vehicle deleted successfully";
}


// export const filterVehicleService = async (id: number) => {
//     return await db.select({
//         VehicleName: VehiclesTable.name,
//         MenuItem: MenuItemsTable.description
//     }).from(VehiclesTable).rightJoin(MenuItemsTable, eq(VehiclesTable.id, MenuItemsTable.Vehicle_id))
// }