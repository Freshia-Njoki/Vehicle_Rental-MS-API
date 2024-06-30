import { z } from 'zod'


export const userSchema = z.object({
    full_name: z.string(),
    email: z.string(),
    contact_phone: z.string(),
    address: z.string(),
    role: z.string()
})

export const vehicleSchema = z.object({
    rental_rate: z.number().multipleOf(0.01),
    availability: z.boolean()
})

export const vehicleSpecSchema = z.object({
    vehicle_id: z.number(),
    manufacturer: z.string(),
    model: z.string(),
    year: z.number(),
    fuel_type: z.string(),
    engine_capacity: z.string(),
    transmission: z.string(),
    seating_capacity: z.number(), 
    color: z.string(),
    features: z.string(),
})

export const bookingSchema = z.object({
    user_id: z.number(),
    vehicle_id: z.number(),
    location_id: z.number(),
    total_amount: z.number().multipleOf(0.01),
    booking_status: z.string()
})

export const paymentsSchema = z.object({
    booking_id: z.number(),
    amount: z.number().multipleOf(0.01),
    payment_status: z.string(),
    payment_method: z.string(),
    transaction_id: z.string()
})
export const customerSupportTicketSchema = z.object({
    user_id: z.number(),
    subject: z.string(),
    description: z.string(),
    status: z.string()
})

export const locationSchema = z.object({
    name: z.string(),
    address: z.string(),
    contact_phone: z.string()
})

export const fleetSchema = z.object({
    vehicle_id: z.number(),
    depreciation_rate: z.number(),
    current_value: z.number(),
    maintenance_cost: z.number(),
    status: z.string()
})

export const loginUserSchema = z.object({
    userId: z.number(),
    password: z.string()
})

export const registerUserSchema = z.object({
    userId: z.number(),
    password: z.string()
})