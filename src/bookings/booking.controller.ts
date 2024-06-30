import { Context } from "hono";
import { bookingService, getBookingService, createBookingService, updateBookingService, deleteBookingService } from "./booking.service";

export const listBooking = async (c: Context) => {
    try {
        //limit the number of bookings to be returned

        const limit = Number(c.req.query('limit'))

        const data = await bookingService(limit);
        if (data == null || data.length == 0) {
            return c.text("booking not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getBookings = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const booking = await getBookingService(id);
    if (booking == undefined) {
        return c.text("booking not found", 404);
    }
    return c.json(booking, 200);
}
export const createBooking = async (c: Context) => {
    try {
        const booking = await c.req.json();
        const createdbooking = await createBookingService(booking);


        if (!createdbooking) return c.text("booking not created", 404);
        return c.json({ msg: createdbooking }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateBooking = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const booking = await c.req.json();
    try {
        // search for the booking
        const searchedbooking = await getBookingService(id);
        if (searchedbooking == undefined) return c.text("booking not found", 404);
        // get the data and update it
        const res = await updateBookingService(id, booking);
        // return a success message
        if (!res) return c.text("booking not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteBooking = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the booking
        const booking = await getBookingService(id);
        if (booking == undefined) return c.text("booking not found", 404);
        //deleting the booking
        const res = await deleteBookingService(id);
        if (!res) return c.text("booking not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// export const getMoreBookingInfo = async(c:Context) => {

//     const bookingsInfo = await getMoreBookingInfoService();
//     if (bookingsInfo == undefined) {
//         return c.text("bookingsInfo not found", 404);
//     }
//     return c.json(bookingsInfo, 200);
// }