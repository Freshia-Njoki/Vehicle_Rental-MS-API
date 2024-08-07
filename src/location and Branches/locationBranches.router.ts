import { Hono } from "hono";
import { listLocationBranchs, getLocationBranch, createLocationBranch, updateLocationBranch, deleteLocationBranch, getLocationBranchInfo } from "./locationBranches.controller"
import { zValidator } from "@hono/zod-validator";
import { locationSchema } from "../validators";
import { adminRoleAuth,userRoleAuth, userOrAdminRoleAuth } from "../middleware/bearAuth";
export const locationBranchRouter = new Hono();

//get all locationBranchs      api/locationBranchs
locationBranchRouter.get("/locationBranch",listLocationBranchs);
//get a single locationBranch    api/locationBranchs/1
locationBranchRouter.get("/locationBranch/:id",getLocationBranch)
// create a locationBranch 
locationBranchRouter.post("/locationBranch", zValidator('json', locationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createLocationBranch)
//update a locationBranch
locationBranchRouter.put("/locationBranch/:id", updateLocationBranch)

locationBranchRouter.delete("/locationBranch/:id",deleteLocationBranch)
locationBranchRouter.get("/locationBranchsInfo",getLocationBranchInfo)

//https:domai.com/api/locationBranchs?limit=10