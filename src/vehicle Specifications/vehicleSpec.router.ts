import { Hono } from "hono";
import { listCities, getCity, createCity, updateCity, deleteCity, getMoreCityInfo } from "./vehicleSpec.controller"
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";
export const cityRouter = new Hono();

//get all city      api/city
cityRouter.get("/city", listCities);
//get a single City    api/city/1
cityRouter.get("/city/:id", getCity)
// create a City 
cityRouter.post("/city", adminRoleAuth,zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createCity)
//update a City
cityRouter.put("/city/:id",adminRoleAuth, updateCity)

cityRouter.delete("/city/:id",adminRoleAuth, deleteCity)
cityRouter.get("/cityInfo/:id", getMoreCityInfo)

//https:domain.com/api/city?limit=10