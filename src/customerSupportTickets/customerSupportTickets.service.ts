import { eq, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {
  TICity,
  TSCity,
  CitiesTable
} from "../drizzle/schema";

export const CityService = async (limit?: number): Promise<TSCity[] | null> => {
  if (limit) {
    return await db.query.CitiesTable.findMany({
      limit: limit,
    });
  }
  return await db.query.CitiesTable.findMany();
};

export const getCityService = async (
  id: number
): Promise<TICity | undefined> => {
  return await db.query.CitiesTable.findFirst({
    where: eq(CitiesTable.id, id),
  });
};

export const createCityService = async (City: TICity) => {
  await db.insert(CitiesTable).values(City);
  return "City created successfully";
};

export const updateCityService = async (id: number, City: TICity) => {
  await db.update(CitiesTable).set(City).where(eq(CitiesTable.id, id));
  return "City updated successfully";
};

export const deleteCityService = async (id: number) => {
  await db.delete(CitiesTable).where(eq(CitiesTable.id, id));
  return "City deleted successfully";
};

export const getMoreCityInfoService = async (id: number) => {
  return await db.query.CitiesTable.findMany({
    columns: {
      address: false
    },
    with: {
      state: {
        columns: {
          name: true
        },
        with: {
          city: {
            columns: {
              name: true,
              restaurant: true
            }
          }
        }
      }
    },
  });


}
