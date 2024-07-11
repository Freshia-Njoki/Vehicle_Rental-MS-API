import { Hono } from "hono";
import { listBooking, getBookings, createBooking, updateBooking, deleteBooking } from "./booking.controller"
import { zValidator } from "@hono/zod-validator";
import { bookingSchema } from "../validators";
import { adminRoleAuth,userOrAdminRoleAuth,userRoleAuth } from "../middleware/bearAuth";
export const bookingRouter = new Hono();


bookingRouter.get("/booking", listBooking);

bookingRouter.get("/booking/:id", userRoleAuth, getBookings)

bookingRouter.post("/booking", zValidator('json', bookingSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createBooking)

bookingRouter.put("/booking/:id", updateBooking)

bookingRouter.delete("/booking/:id",  deleteBooking)
// bookingRouter.get("/bookingInfo",userOrAdminRoleAuth, getMorebookingInfo)

