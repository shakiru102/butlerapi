import { Request, Response } from "express"
import { userDetails } from "../../types"
import Admin from "../models/adminModel"
import { confirmPassword, hashPassword } from "../utils/bcrypt"
import { authUser, verifyUser } from "../utils/verify"

export const adminSignup = async (req: Request, res: Response) => {

    try {
    const { firstname, lastname, email, password, phonenumber}: userDetails = req.body 
    const newPassword = await hashPassword(password) 
    const isNewUser = await Admin.findOne({ email }) 
    if(isNewUser) throw new Error('User already exist')
    const user = await Admin.create({ firstname, lastname, email, password: newPassword, phonenumber })
    const token = authUser({ id: user._id})
    res.status(200).json({ status: 'Success', token })
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({ status: 'Failed', error: error.message })
    }
}

export const adminSignin = async (req: Request, res: Response) => {
    try {
        const { email, password }: userDetails = req.body
        const verifyEmail = await Admin.findOne({ email })
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

export const adminAuth = async (req: Request, res: Response) => {
    try {
         const token = req.header('Authorization')?.slice(7)
        if(!token) throw new Error('Unauthorized')
        const verifiedToken = verifyUser(token)
        if(!verifiedToken) throw new Error('Unauthroized')
     //    @ts-ignore
        const admin = await Admin.findById({ _id: verifiedToken.id }, { _id: 1, email: 1, firstname: 1, lastname: 1, phonenumber: 1 })
        if(!admin) throw new Error('Unauthorized') 
        res.status(200).json({ status: 'Success', adminDetails: admin })
 
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({ status: 'Failed', error: error.message })
    }
 }