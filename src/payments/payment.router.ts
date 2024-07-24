import { Hono } from "hono";
import { listPayment, getPayment, createPayment, updatePayment, deletePayment, getRevenueFromPayments, getMorePaymentInfo} from "./payment.controller"
import { zValidator } from "@hono/zod-validator";
import { paymentsSchema } from "../validators";
import { adminRoleAuth,userOrAdminRoleAuth } from "../middleware/bearAuth";
export const paymentRouter = new Hono();

//get all payment      api/payment
paymentRouter.get("/payment", listPayment);
//get a single Payment    api/payment/1
paymentRouter.get("/payment/:id", getPayment)
// create a Payment 
paymentRouter.post("/payment", zValidator('json', paymentsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createPayment)
//update a Payment
paymentRouter.put("/payment/:id", updatePayment)

paymentRouter.delete("/payment/:id",deletePayment)
// PaymentRouter.get("/activepayments",userOrAdminRoleAuth, listActivepayments)
paymentRouter.get("/PaymentInfo", getMorePaymentInfo)
paymentRouter.get('/revenue/payments', getRevenueFromPayments);

//https:domai.com/api/payment?limit=10