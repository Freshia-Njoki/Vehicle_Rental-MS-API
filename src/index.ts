import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import { prometheus } from '@hono/prometheus'
import { html, raw } from 'hono/html'
import {cors} from 'hono/cors'
import stripe from "stripe"

import { userRouter } from './users/users.router'
import { bookingRouter} from './bookings/booking.router'
import { authRouter } from './auth/auth.router'
import { customerSupportTicketRouter } from './customerSupportTickets/customerSupportTickets.router'
import { fleetRouter } from './fleet/fleet.router'
import { vehicleRouter } from './vehicles/vehicles.router'
import { vehicleSpecRouter } from './vehicle Specifications/vehicleSpec.router'
import { paymentRouter } from './payments/payment.router'
import { locationBranchRouter } from './location and Branches/locationBranches.router'
import { contactRouter } from './contactUs/contact.router'

const app = new Hono().basePath('/api')

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  })

const { printMetrics, registerMetrics } = prometheus()

app.use('*', registerMetrics)
app.get('/metrics', printMetrics)
app.use(cors({ origin: "*"}))
app.use(logger()) 
app.use(csrf()) //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()) //removes trailing slashes from the request URL
app.use('/', timeout(10000, customTimeoutException))

// default route
app.get('/', (c) => {
  return c.html(
    html`
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f7f9fc;
          margin: 0;
          padding: 20px;
          color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          background: #ffffff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 600px;
          width: 100%;
        }
        h1 {
          color: #2c3e50;
          font-size: 2.5em;
          margin-bottom: 0.5em;
        }
        p {
          font-size: 1.2em;
          margin-bottom: 1.5em;
          color: #555;
        }
        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        li {
          font-size: 1em;
          background: #ecf0f1;
          margin: 10px 0;
          padding: 15px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        li:hover {
          background-color: #dce1e3;
        }
      </style>
      <div class="container">
        <h1>Freshias' Vehicle Rental Management System API</h1>
        <p>Welcome!🥳 This API provides programmatic access to functionalities for managing  Vehicle Rentals operations😎</p>
        <ul>
          <li>Automate tasks and streamline workflows.</li>
          <li>Develop custom applications to enhance  Vehicle Rental operations.</li>
        </ul>
      </div>
    `
  )
})

app.get('/ok', (c) => {
  return c.text('Server is running...')
})


app.route("/", userRouter)   // /users
app.route("/", bookingRouter)
app.route("auth/", authRouter)   // api/auth/register   or api/auth/login
app.route("/", customerSupportTicketRouter)
app.route("/", fleetRouter)
app.route("/", vehicleRouter)
app.route("/", vehicleSpecRouter)
app.route("/", paymentRouter)
app.route("/", locationBranchRouter)
app.route("/", contactRouter)

const Stripe = new stripe('sk_test_51NVI3GJLwJLu0Jfmlcrdge2wdm5zJikJHiIKZ5pSO4u0hueTBXTx8ON4KOOAmeZUIUSTKpJynEZVQcFbw6meMC5800lOmB3FF0', {
  apiVersion: '2024-06-20',
});

app.post("/create-payment-intent", async (c: Context) => {
    try {
      const paymentIntent = await Stripe.paymentIntents.create({
        currency: "EUR",
        amount: 1999,
        automatic_payment_methods: { enabled: true },
      });
  
      return c.json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      console.error('error creating payment intent', e)
      return c.json({error: 'Failed to create payment intent'}, 500)
    }
  });

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})
console.log(`Server is running on port ${process.env.PORT}`)