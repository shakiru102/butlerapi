import joi from 'joi'
import { userDetails } from '../../types'

const signupAdminSchema = joi.object<userDetails>({
    email: joi.string().required().email(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    password: joi.string().required().min(8),
    phonenumber: joi.string().required(),
})

const signinSchema = joi.object<userDetails>({
    email: joi.string().required().email(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(8)
    
})

export const validateSigninSchema = (data: userDetails) => signinSchema.validate(data)

export const validateSignupAdminSchema = (data: userDetails) => signupAdminSchema.validate(data)