import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TILocationBranch, TSLocationBranch, LocationBranchTable } from "../drizzle/schema";

export const LocationBranchService = async (limit?: number): Promise<TSLocationBranch[] | null> => {
    if (limit) {
        return await db.query.LocationBranchTable.findMany({
            limit: limit
        });
    }
    return await db.query.LocationBranchTable.findMany();
}

export const getLocationBranchService = async (id: number): Promise<TILocationBranch | undefined> => {
    return await db.query.LocationBranchTable.findFirst({
        where: eq(LocationBranchTable.id, id)
    })
}

export const createLocationBranchService = async (LocationBranch: TILocationBranch) => {
    await db.insert(LocationBranchTable).values(LocationBranch)
    return "LocationBranch created successfully";
}

export const updateLocationBranchService = async (id: number, LocationBranch: TILocationBranch) => {
    await db.update(LocationBranchTable).set(LocationBranch).where(eq(LocationBranchTable.id, id))
    return "LocationBranch updated successfully";
}

export const deleteLocationBranchService = async (id: number) => {
    await db.delete(LocationBranchTable).where(eq(LocationBranchTable.id, id))
    return "LocationBranch deleted successfully";
}

export const getMoreLocationBranchInfoService = async () => {
    return await db.query.LocationBranchTable.findMany({
      columns: {name:true, 
        contact_phone:true, 
        address:true      
      },
      with: {
        booking: {
          columns: {
            booking_status:true,
            return_date:true, 
            total_amount:true, 
            vehicle_id:true        
          }
        }
      },
    });
  
  
  }
  