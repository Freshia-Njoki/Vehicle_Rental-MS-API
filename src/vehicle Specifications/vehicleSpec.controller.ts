import { Context } from "hono";
import { CityService, getCityService, createCityService, updateCityService, deleteCityService, getMoreCityInfoService} from "./vehicleSpec.service";

export const listCities = async (c: Context) => {
    try {
        //limit the number of Citys to be returned

        const limit = Number(c.req.query('limit'))

        const data = await CityService(limit);
        if (data == null || data.length == 0) {
            return c.text("City not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getCityService(id);
    if (City == undefined) {
        return c.text("City not found", 404);
    }
    return c.json(City, 200);
}
export const createCity = async (c: Context) => {
    try {
        const City = await c.req.json();
        const createdCity = await createCityService(City);


        if (!createdCity) return c.text("City not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the City
        const searchedCity = await getCityService(id);
        if (searchedCity == undefined) return c.text("City not found", 404);
        // get the data and update it
        const res = await updateCityService(id, City);
        // return a success message
        if (!res) return c.text("City not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCity = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the City
        const City = await getCityService(id);
        if (City == undefined) return c.text("City not found", 404);
        //deleting the City
        const res = await deleteCityService(id);
        if (!res) return c.text("City not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getMoreCityInfo = async(c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const cityInfo = await getMoreCityInfoService(id);
    if (cityInfo == undefined) {
        return c.text("city not found", 404);
    }
    return c.json(cityInfo, 200);
}