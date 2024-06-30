import { Context } from "hono";
import { VehicleSpecificationsService, getVehicleSpecificationsService, createVehicleSpecificationsService, updateVehicleSpecificationsService, deleteVehicleSpecificationsService, getMoreVehicleSpecificationsInfoService} from "./vehicleSpec.service";

export const listVehicleSpecifications = async (c: Context) => {
    try {
        //limit the number of VehicleSpecificationss to be returned

        const limit = Number(c.req.query('limit'))

        const data = await VehicleSpecificationsService(limit);
        if (data == null || data.length == 0) {
            return c.text("VehicleSpecifications not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getVehicleSpecifications = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const VehicleSpecifications = await getVehicleSpecificationsService(id);
    if (VehicleSpecifications == undefined) {
        return c.text("VehicleSpecifications not found", 404);
    }
    return c.json(VehicleSpecifications, 200);
}
export const createVehicleSpecifications = async (c: Context) => {
    try {
        const VehicleSpecifications = await c.req.json();
        const createdVehicleSpecifications = await createVehicleSpecificationsService(VehicleSpecifications);


        if (!createdVehicleSpecifications) return c.text("VehicleSpecifications not created", 404);
        return c.json({ msg: createdVehicleSpecifications }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateVehicleSpecifications = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const VehicleSpecifications = await c.req.json();
    try {
        // search for the VehicleSpecifications
        const searchedVehicleSpecifications = await getVehicleSpecificationsService(id);
        if (searchedVehicleSpecifications == undefined) return c.text("VehicleSpecifications not found", 404);
        // get the data and update it
        const res = await updateVehicleSpecificationsService(id, VehicleSpecifications);
        // return a success message
        if (!res) return c.text("VehicleSpecifications not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteVehicleSpecifications = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the VehicleSpecifications
        const VehicleSpecifications = await getVehicleSpecificationsService(id);
        if (VehicleSpecifications == undefined) return c.text("VehicleSpecifications not found", 404);
        //deleting the VehicleSpecifications
        const res = await deleteVehicleSpecificationsService(id);
        if (!res) return c.text("VehicleSpecifications not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getMoreVehicleSpecificationsInfo = async(c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const VehicleSpecificationsInfo = await getMoreVehicleSpecificationsInfoService(id);
    if (VehicleSpecificationsInfo == undefined) {
        return c.text("VehicleSpecifications not found", 404);
    }
    return c.json(VehicleSpecificationsInfo, 200);
}