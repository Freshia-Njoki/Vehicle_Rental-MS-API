import { Context } from "hono";
import { paymentService, getPaymentService, createPaymentService, updatePaymentService, deletePaymentService, getMorePaymentInfoService } from "./payment.service";

export const listPayment = async (c: Context) => {
    try {
        //limit the number of payment to be returned

        const limit = Number(c.req.query('limit'))

        const data = await paymentService(limit);
        if (data == null || data.length == 0) {
            return c.text("payment not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getPayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const payment = await getPaymentService(id);
    if (payment == undefined) {
        return c.text("payment not found", 404);
    }
    return c.json(payment, 200);
}
export const createPayment = async (c: Context) => {
    try {
        const payment = await c.req.json();
        const createdpayment = await createPaymentService(payment);


        if (!createdpayment) return c.text("payment not created", 404);
        return c.json({ msg: createdpayment }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatePayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const payment = await c.req.json();
    try {
        // search for the payment
        const searchedpayment = await getPaymentService(id);
        if (searchedpayment == undefined) return c.text("payment not found", 404);
        // get the data and update it
        const res = await updatePaymentService(id, payment);
        // return a success message
        if (!res) return c.text("payment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletePayment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the payment
        const payment = await getPaymentService(id);
        if (payment == undefined) return c.text("payment not found", 404);
        //deleting the payment
        const res = await deletePaymentService(id);
        if (!res) return c.text("payment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


// export const listActivepayments = async (c: Context) => {
//     const data = await getActivepaymentsService();
//     if (!data) return c.text("No active payment items found", 404);

//     return c.json(data, 200);
// };

export const getMorePaymentInfo = async(c:Context) => {
    const paymentInfo = await getMorePaymentInfoService();
    if (paymentInfo == undefined) {
        return c.text("paymentInfo not found", 404);
    }
    return c.json(paymentInfo, 200);
}