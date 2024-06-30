import { eq, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {
  TIVehicleSpec,
  TSVehicleSpec,
  VehicleSpecificationsTable
} from "../drizzle/schema";

export const VehicleSpecificationsService = async (limit?: number): Promise<TSVehicleSpec[] | null> => {
  if (limit) {
    return await db.query.VehicleSpecificationsTable.findMany({
      limit: limit,
    });
  }
  return await db.query.VehicleSpecificationsTable.findMany();
};

export const getVehicleSpecificationsService = async (
  id: number
): Promise<TIVehicleSpec | undefined> => {
  return await db.query.VehicleSpecificationsTable.findFirst({
    where: eq(VehicleSpecificationsTable.id, id),
  });
};

export const createVehicleSpecificationsService = async (VehicleSpec: TIVehicleSpec) => {
  await db.insert(VehicleSpecificationsTable).values(VehicleSpec);
  return "VehicleSpec created successfully";
};

export const updateVehicleSpecificationsService = async (id: number, VehicleSpec: TIVehicleSpec) => {
  await db.update(VehicleSpecificationsTable).set(VehicleSpec).where(eq(VehicleSpecificationsTable.id, id));
  return "VehicleSpec updated successfully";
};

export const deleteVehicleSpecificationsService = async (id: number) => {
  await db.delete(VehicleSpecificationsTable).where(eq(VehicleSpecificationsTable.id, id));
  return "VehicleSpec deleted successfully";
};

export const getMoreVehicleSpecificationsInfoService = async (id: number) => {
  return await db.query.VehicleSpecificationsTable.findMany({
    columns: {
     id: false,
    },
    with: {
      vehicles: {
        columns: 
        {
          availability:true,
          rental_rate: true,
          updated_at:true

        }
      }
    },
  });


}
