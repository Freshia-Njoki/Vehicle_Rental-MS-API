import { Context } from "hono";
import { LocationBranchService, getLocationBranchService, createLocationBranchService, updateLocationBranchService, deleteLocationBranchService,getMoreLocationBranchInfoService } from "./locationBranches.service";

export const listLocationBranchs = async (c: Context) => {
    try {
        //limit the number of locationBranch to be returned

        const limit = Number(c.req.query('limit'))

        const data = await LocationBranchService(limit);
        if (data == null || data.length == 0) {
            return c.text("locationBranch not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getLocationBranch = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const locationBranch = await getLocationBranchService(id);
    if (locationBranch == undefined) {
        return c.text("locationBranch not found", 404);
    }
    return c.json(locationBranch, 200);
}
export const createLocationBranch = async (c: Context) => {
    try {
        const locationBranch = await c.req.json();
        const createdLocationBranch = await createLocationBranchService(locationBranch);


        if (!createdLocationBranch) return c.text("locationBranch not created", 404);
        return c.json({ msg: createdLocationBranch }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateLocationBranch = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const locationBranch = await c.req.json();
    try {
        // search for the locationBranch
        const searchedLocationBranch = await getLocationBranchService(id);
        if (searchedLocationBranch == undefined) return c.text("locationBranch not found", 404);
        // get the data and update it
        const res = await updateLocationBranchService(id, locationBranch);
        // return a success message
        if (!res) return c.text("locationBranch not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteLocationBranch = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the locationBranch
        const locationBranch = await getLocationBranchService(id);
        if (locationBranch == undefined) return c.text("locationBranch not found", 404);
        //deleting the locationBranch
        const res = await deleteLocationBranchService(id);
        if (!res) return c.text("locationBranch not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getLocationBranchInfo = async(c:Context) => {

    const LocationBranchInfo = await getMoreLocationBranchInfoService();
    if (LocationBranchInfo == undefined) {
        return c.text("LocationBranch not found", 404);
    }
    return c.json(LocationBranchInfo, 200);
}