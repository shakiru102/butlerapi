import { Request, Response } from "express"
import { userDetails } from "../../types"
import User from "../models/userModel"
import { confirmPassword, hashPassword } from "../utils/bcrypt"
import { authUser, verifyUser } from "../utils/verify"
import Sendchamp from "sendchamp-sdk"
import Order from "../models/orderModel"

const sms = new Sendchamp({ publicKey: `sendchamp_live_$2y$10$A3quLpp9DK7zOcdp1kX4t.XRyp.67rst3gLuV.W5LtlgYCeTCnQDS` })


export const userSignup = async (req: Request, res: Response) => {

    try {
    const { firstname, lastname, email, password, phonenumber, address}: userDetails = req.body 
    const newPassword = await hashPassword(password) 
    const isNewUser = await User.findOne({ email }) 
    if(isNewUser) throw new Error('User already exist')
    const user = await User.create({ firstname, lastname, email, password: newPassword, phonenumber , address})
    const token = authUser({ id: user._id})
    res.status(200).json({ status: 'Success', token })
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({ status: 'Failed', error: error.message })
    }
}

export const userSignin = async (req: Request, res: Response) => {
    try {
        const { email, password }: userDetails = req.body
        const verifyEmail = await User.findOne({ email })
        if(!verifyEmail) throw new Error('Invalid Email')
        const verifyPassword = await confirmPassword(password, verifyEmail.password)
        if(!verifyPassword) throw new Error('Invalid Password')
        const token = authUser({id: verifyEmail._id})
        res.status(200).json({ status: 'Success' , token })
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({ status: 'Failed',  error: error.message})
    }
}

export const userAuth = async (req: Request, res: Response) => {
    try {
         const token = req.header('Authorization')?.slice(7)
        if(!token) throw new Error('Unauthorized')
        const verifiedToken = verifyUser(token)
        if(!verifiedToken) throw new Error('Unauthroized')
     //    @ts-ignore
        const user = await User.findById({ _id: verifiedToken.id }, { _id: 1, email: 1, firstname: 1, lastname: 1, phonenumber: 1, address: 1 })
        if(!user) throw new Error('Unauthorized') 
        res.status(200).json({ status: 'Success', userDetails: user })
 
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({ status: 'Failed', error: error.message })
    }
 }

 export const forgetUserPassword = async (req: Request, res: Response) => {
     const otpMail = sms.VERIFICATION
     try {
        //  @ts-ignore
       const reference = await otpMail.sendOTP({ channel: 'email', expiration_time: 5, token_type: "numeric", token_length: 6, customer_email_address: 'ashakiru53@gmail.com', sender: 'butlerdevelopers@gmail.com', meta_data: {
           customer_email_address: 'butlerdevelopers@gmail.com'
       }  })
       console.log(reference);
       res.send({msg: 'OTP sent'})
     } catch (error: any) {
         console.log(error.message);
         res.send({error: 'there was an error'})
         
     }
 }

export const getUserSubscription = async (req: Request, res: Response) => {
    try {
        const subscriptions = await Order.find({ userID: req.query.userID, servicePlan: 'Subscription' })
        if(!subscriptions.length) return res.status(200).send({ status: 'Failed',  msg: 'Can not get subscriptions for user' })
        res.status(200).json({ status: 'Success',  subscriptions })
    } catch (error: any) {
        res.status(400).send({ status: 'Failed', error: error.message })
    }
}