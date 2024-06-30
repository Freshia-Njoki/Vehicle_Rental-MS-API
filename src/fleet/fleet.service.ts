import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIFleet, TSFleet, FleetTable, VehiclesTable } from "../drizzle/schema";

export const FleetService = async (limit?: number): Promise<TSFleet[] | null> => {
    if (limit) {
        return await db.query.FleetTable.findMany({
            limit: limit
        });
    }
    return await db.query.FleetTable.findMany();
}

export const getFleetService = async (id: number): Promise<TIFleet | undefined> => {
    return await db.query.FleetTable.findFirst({
        where: eq(FleetTable.id, id)
    })
}

export const createFleetService = async (Order: TIFleet) => {
    await db.insert(FleetTable).values(Order)
    return "Order created successfully";
}

export const updateFleetService = async (id: number, Order: TIFleet) => {
    await db.update(FleetTable).set(Order).where(eq(FleetTable.id, id))
    return "Order updated successfully";
}

export const deleteFleetService = async (id: number) => {
    await db.delete(FleetTable).where(eq(FleetTable.id, id))
    return "Order deleted successfully";
}


export const filterFleetService = async (id: number) => {
    return await db.select({
      maintenance_cost: FleetTable.maintenance_cost,
      VehiclesTable: VehiclesTable.rental_rate
    }).from(VehiclesTable).rightJoin(FleetTable, eq(VehiclesTable.id, FleetTable.vehicle_id))
}


export const getMoreFleetInfoService = async () => {
    return await db.query.FleetTable.findMany({
      columns: {
        created_at: true
      },
      with: {
        vehicles: {
          columns: {
            rental_rate: true,
            availability: true
          }
        }
      },
    });
  
  
  }
  