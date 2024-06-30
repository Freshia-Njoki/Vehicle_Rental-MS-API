import { Hono } from "hono";
import { listFleet, getFleet, createFleet, updateFleet, deleteFleet,filterFleetInfo,getMoreFleetInfo} from "./fleet.controller"
import { zValidator } from "@hono/zod-validator";
import { fleetSchema } from "../validators";
import { adminRoleAuth,userRoleAuth, userOrAdminRoleAuth } from "../middleware/bearAuth";
export const fleetRouter = new Hono();

//get all Fleet     api/Fleet
fleetRouter.get("/fleet",listFleet);
//get a single Fleet    api/Fleet/1
fleetRouter.get("/fleet/:id", getFleet)
// create a Fleet 
fleetRouter.post("/fleet",zValidator('json', fleetSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createFleet)
//update  Fleet
fleetRouter.put("/fleet/:id", updateFleet)

fleetRouter.delete("/fleet/:id", deleteFleet)
fleetRouter.get("/filterFleetInfo/:id", filterFleetInfo)
fleetRouter.get("/fleetInfo", getMoreFleetInfo)

