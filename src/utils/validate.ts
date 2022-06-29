import joi from 'joi'
import { userDetails, adminDetails, OrderDetails, updateSubscriptionProps } from '../../types'

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

const laundrySubscriptionSchema = joi.object<OrderDetails>({
    amount: joi.number().required(),
    deliveryAddress: joi.string().required(),
    deliveryDate: joi.string().required(),
    description: joi.string().required(),
    endDate: joi.string().required(),
    frequency: joi.number().required(),
    phonenumber: joi.string().required(),
    pickUpAddress: joi.string().required(),
    items: joi.array().required(),
    pickUpDate: joi.string().required(),
    pickUpDay: joi.string().required(),
    quantity: joi.number().required(),
    pickUpTime: joi.string().required(),
    reference: joi.string().required(),
    servicePlan: joi.string().required(),
    serviceType: joi.string().required(),
    startDate: joi.string().required(),
    userID: joi.string().required(),
    username: joi.string().required(),
    frequencyCompleted: joi.number().required()
})
const laundryOneOffSchema = joi.object<OrderDetails>({
    amount: joi.number().required(),
    deliveryAddress: joi.string().required(),
    deliveryDate: joi.string().required(),
    description: joi.string().required(),
    phonenumber: joi.string().required(),
    pickUpAddress: joi.string().required(),
    items: joi.array().required(),
    pickUpDate: joi.string().required(),
    pickUpDay: joi.string().required(),
    pickUpTime: joi.string().required(),
    reference: joi.string().required(),
    servicePlan: joi.string().required(),
    serviceType: joi.string().required(),
    userID: joi.string().required(),
    username: joi.string().required()
})

const homeCleaningSubscriptionSchema = joi.object<OrderDetails>({
    amount: joi.number().required(),
    deliveryAddress: joi.string().required(),
    deliveryDate: joi.string().required(),
    pickUpDate: joi.string().required(),
    pickUpDay: joi.string().required(),
    description: joi.string().required(),
    endDate: joi.string().required(),
    frequency: joi.number().required(),
    phonenumber: joi.string().required(),
    items: joi.array().required(),
    pickUpTime: joi.string().required(),
    reference: joi.string().required(),
    servicePlan: joi.string().required(),
    serviceType: joi.string().required(),
    startDate: joi.string().required(),
    userID: joi.string().required(),
    username: joi.string().required(),
    apartmentType: joi.string().required(),
    frequencyCompleted: joi.number().required()

})

const homeCleaningOneOffSchema = joi.object<OrderDetails>({
    amount: joi.number().required(),
    deliveryAddress: joi.string().required(),
    deliveryDate: joi.string().required(),
    pickUpDate: joi.string().required(),
    pickUpDay: joi.string().required(),
    description: joi.string().required(),
    frequency: joi.number().required(),
    phonenumber: joi.string().required(),
    items: joi.array().required(),
    pickUpTime: joi.string().required(),
    reference: joi.string().required(),
    servicePlan: joi.string().required(),
    serviceType: joi.string().required(),
    userID: joi.string().required(),
    username: joi.string().required(),
    apartmentType: joi.string().required()
})

const updateSubscriptionSchema = joi.object<updateSubscriptionProps>({
    setPickupDate: joi.string().required(),
    subscriptionType: joi.string().required()
})

// const subscriptionSchema = joi.object<OrderDetails>({
//     amount: joi.number().required(),
//     deliveryAddress: joi.string().required(),
//     deliveryDate: joi.string().required(),
//     description: joi.string().required(),
//     endDate: joi.string().required(),
//     frequency: joi.number().required(),
//     frequencyCompleted: joi.number().required(),
//     phonenumber: joi.string().required(),
//     pickUpAddress: joi.string().required(),
//     items: joi.array().required(),
//     pickUpDate: joi.string().required(),
//     pickUpDay: joi.string().required(),
//     quantity: joi.string().required(),
//     apartmentType: joi.string().required(),
//     pickUpTime: joi.string().required(),
//     reference: joi.string().required(),
//     servicePlan: joi.string().required(),
//     serviceType: joi.string().required(),
//     startDate: joi.string().required(),
//     status: joi.string().required(),
//     userID: joi.string().required(),
//     username: joi.string().required()

// })

export const validateSigninSchema = (data: adminDetails | userDetails) => signinSchema.validate(data)

export const validateSignupAdminSchema = (data: adminDetails) => signupAdminSchema.validate(data)
export const validateSignupUserSchema = (data: userDetails) => signupUserSchema.validate(data)
export const validateUpdateStatus = (status: { status: string }) => updateDateStatusSchema.validate(status)
export const validateLaundrySubscriptionData = (data: OrderDetails) => laundrySubscriptionSchema.validate(data)
export const validateLaundryOneOffData = (data: OrderDetails) => laundryOneOffSchema.validate(data)
export const validateHomeCleaningSubscriptionSchemaData = (data: OrderDetails) => homeCleaningSubscriptionSchema.validate(data)
export const validateHomeCleaningOneOffSchemaData = (data: OrderDetails) => homeCleaningOneOffSchema.validate(data)
export const validateSubcriptionUpdate = (data: updateSubscriptionProps) => updateSubscriptionSchema.validate(data)