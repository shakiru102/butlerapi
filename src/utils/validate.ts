import joi from 'joi'
import { userDetails, adminDetails, OrderDetails } from '../../types'

const signupAdminSchema = joi.object<adminDetails>({
    email: joi.string().required().email(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    password: joi.string().required().min(8),
    phonenumber: joi.string().required(),
    confirmPassword: joi.ref('password')
})

const signupUserSchema = joi.object<userDetails>({
    email: joi.string().required().email(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    password: joi.string().required().min(8),
    phonenumber: joi.string().required(),
    confirmPassword: joi.ref('password'),
    address: joi.string().required()
})

const signinSchema = joi.object<adminDetails>({
    email: joi.string().required().email(),
    password: joi.string().required().min(8)
    
})

const updateDateStatusSchema = joi.object<{ status: string }>({
  status: joi.string().required()
})
const subscriptionSchema = joi.object<OrderDetails>({
    amount: joi.number().required(),
    deliveryAddress: joi.string().required(),
    deliveryDate: joi.string().required(),
    description: joi.string().required(),
    endDate: joi.string().required(),
    frequency: joi.number().required(),
    frequencyCompleted: joi.number().required(),
    phonenumber: joi.string().required(),
    pickUpAddress: joi.string().required(),
    items: joi.array().required(),
    pickUpDate: joi.string().required(),
    pickUpDay: joi.string().required(),
    quantity: joi.string().required(),

})

export const validateSigninSchema = (data: adminDetails | userDetails) => signinSchema.validate(data)

export const validateSignupAdminSchema = (data: adminDetails) => signupAdminSchema.validate(data)
export const validateSignupUserSchema = (data: userDetails) => signupUserSchema.validate(data)
export const validateUpdateStatus = (status: { status: string }) => updateDateStatusSchema.validate(status)