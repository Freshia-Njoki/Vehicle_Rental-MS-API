import { Context } from "hono";
import { FleetService, getFleetService, createFleetService, updateFleetService, deleteFleetService, filterFleetService, getMoreFleetInfoService } from "./fleet.service";

export const listFleet = async (c: Context) => {
    try {
        //limit the number of Fleet to be returned

        const limit = Number(c.req.query('limit'))

        const data = await FleetService(limit);
        if (data == null || data.length == 0) {
            return c.text("Fleet not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getFleet = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Fleet = await getFleetService(id);
    if (Fleet == undefined) {
        return c.text("Fleet not found", 404);
    }
    return c.json(Fleet, 200);
}
export const createFleet = async (c: Context) => {
    try {
        const Fleet = await c.req.json();
        const createdFleet = await createFleetService(Fleet);


        if (!createdFleet) return c.text("Fleet not created", 404);
        return c.json({ msg: createdFleet }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateFleet = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Fleet = await c.req.json();
    try {
        // search for the Fleet
        const searchedFleet = await getFleetService(id);
        if (searchedFleet == undefined) return c.text("Fleet not found", 404);
        // get the data and update it
        const res = await updateFleetService(id, Fleet);
        // return a success message
        if (!res) return c.text("Fleet not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteFleet = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Fleet
        const Fleet = await getFleetService(id);
        if (Fleet == undefined) return c.text("Fleet not found", 404);
        //deleting the Fleet
        const res = await deleteFleetService(id);
        if (!res) return c.text("Fleet not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const filterFleetInfo = async(c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const FleetInfo = await filterFleetService(id);
    if (FleetInfo == undefined) {
        return c.text("Fleet not found", 404);
    }
    return c.json(FleetInfo, 200);
}

export const getMoreFleetInfo = async(c:Context) => {

    const FleetInfo = await getMoreFleetInfoService();
    if (FleetInfo == undefined) {
        return c.text("FleetInfo not found", 404);
    }
    return c.json(FleetInfo, 200);
}