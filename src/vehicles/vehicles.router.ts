import { Hono } from "hono";
import { listVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle } from "./vehicles.controller"
import { zValidator } from "@hono/zod-validator";
import { vehicleSchema } from "../validators";
import { adminRoleAuth,userOrAdminRoleAuth,userRoleAuth } from "../middleware/bearAuth";
export const vehicleRouter = new Hono();

//get all vehicles      api/vehicles
vehicleRouter.get("/vehicle", listVehicles);
//get a single vehicle    api/vehicles/1
vehicleRouter.get("/vehicle/:id", getVehicle)
// create a vehicle 
vehicleRouter.post("/vehicle", zValidator('json', vehicleSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createVehicle)
//update a vehicle
vehicleRouter.put("/vehicle/:id",updateVehicle)

vehicleRouter.delete("/vehicle/:id",deleteVehicle)
// vehicleRouter.get("/vehicleInfo/:id", filterVehicleInfo)
