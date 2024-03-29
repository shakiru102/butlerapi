import { Request, Response } from "express"
import moment from "moment"
import { io } from "../.."
import { StatusProps, updateSubscriptionProps, userDetails } from "../../types"
import Admin from "../models/adminModel"
import Order from "../models/orderModel"
import { confirmPassword, hashPassword } from "../utils/bcrypt"
import { authUser, verifyUser } from "../utils/verify"
import Sendchamp from "sendchamp-sdk"

const sms = new Sendchamp({ publicKey: `sendchamp_live_$2y$10$A3quLpp9DK7zOcdp1kX4t.XRyp.67rst3gLuV.W5LtlgYCeTCnQDS` })

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
        if(!verifiedToken.id) throw new Error('Unauthroized')
        const admin = await Admin.findById({ _id: verifiedToken.id }, { _id: 1, email: 1, firstname: 1, lastname: 1, phonenumber: 1 })
        if(!admin) throw new Error('Unauthorized') 
        res.status(200).json({ status: 'Success', adminDetails: admin })
 
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({ status: 'Failed', error: error.message })
    }
 }

 export const getAllOrders = async (req: Request, res: Response) => {
      try {
        const orders =  await Order.find({})
         if(orders.length) return res.status(200).json({ status: 'Success', orders })
         res.status(200).send({ status: 'Failed', msg: 'Can not get orders' })
      } catch (error: any) {
          res.status(400).send({ status: 'Failed', msg: error.message })
      }
 }

 export const getStatusOrder = async (req: Request, res: Response) => {
     const status = req.query.status
    try {
        switch (status) {
            case 'Pending':
              const getPending = await Order.find({ status  }).sort({ pickUpDate: 1 })
              return res.status(200).json({ status: 'Success' , order: getPending })
             case 'Pickup':
               const getPickup = await Order.find({ status , pickUpDate: moment().format('MM-DD-YYYY') })
               return res.status(200).json({ status: 'Success', order: getPickup}) 
             case 'Ongoing':
               const getOnging = await Order.find({ status  }).sort({ pickUpDate: 1 })
               return res.status(200).json({ status: 'Success', order: getOnging})
             case 'Delivery':
               const getDelivery = await Order.find({ deliveryDate: moment().format('MM-DD-YYYY') })
               return res.status(200).json({ status: 'Success', order: getDelivery })
            case 'Complete':
               const getComplete = await Order.find({ deliveryDate: moment().format('MM-DD-YYYY') })
               return res.status(200).json({ status: 'Success', order: getComplete })      
            default:
             const getTask = await Order.find({ status })
             return res.status(200).json({ status: 'Success', order: getTask })
          }
    } catch (error: any) {
        res.status(400).send({ status: 'Failed', msg: error.message })
    }
 }

 export const updateOrderStatus = async (req: Request, res: Response) => {
     try {
         const status: StatusProps = req.body.status

         const isExist = await Order.findOne({ _id: req.params.orderID, status })
         if(!isExist){
        await Order.updateOne({ _id: req.params.orderID },{ $set: { status: status } })
        switch (status) {
            case 'Pending':
                io.emit('Pending', { count: 1 })
                break;
            case 'Pickup':
                const getPickup = await Order.findOne({ _id: req.params.orderID, pickUpDate: moment().format('MM-DD-YYYY') })
               if(getPickup) io.emit('Pickup', { count: 1 })
                break;
            case 'Ongoing':
                io.emit('Ongoing', { count: 1 })
                break;
            case 'Delivery':
               const getDelivery = await Order.findOne({ _id: req.params.orderID, deliveryDate: moment().format('MM-DD-YYYY') })
               if(getDelivery) io.emit('Delivery', { count: 1 })
                break;  
            case 'Complete':
               const getComplete = await Order.findOne({ _id: req.params.orderID, deliveryDate: moment().format('MM-DD-YYYY') })
               if(getComplete) io.emit('Complete', { count: 1 })
                break;     
            default:
                io.emit('Cancelled', { count: 1 })
                break;
        }
         }
         res.status(200).json({ status: 'Success', msg: 'Status updated successfully.' })
     } catch (error: any) {
        res.status(400).send({ status: 'Failed', msg: error.message })
     }
 }
export const updateSubscriptionPickup = async (req: Request, res: Response) => {

    const { subscriptionType, setPickupDate }: updateSubscriptionProps = req.body
   try {
    switch (subscriptionType) {
        case 'Laundry':
            const deliverDate = moment(setPickupDate, 'MM-DD-YYYY').add(2, 'days').format('MM-DD-YYYY')
            await Order.updateOne(
                { _id: req.params.orderID }, 
                { $set: { pickUpDate: setPickupDate, deliveryDate: deliverDate, status: 'Pickup' }, $inc: { frequencyCompleted: 1 } })
                if(setPickupDate === moment().format('MM-DD-YYYY')) io.emit('Pickup', { count: 1 })
            return res.status(200).json({ status: 'Success', msg: 'Pickup updated successfully.' })
        default:
            await Order.updateOne(
                { _id: req.params.orderID }, 
                { $set: { pickUpDate: setPickupDate, deliveryDate: setPickupDate, status: 'Pickup' }, $inc: { frequencyCompleted: 1 } })
                if (setPickupDate === moment().format('MM-DD-YYYY')) {
                    io.emit('Pickup', { count: 1 })
                    io.emit('Delivery', { count: 1 })
                }
            return res.status(200).json({ status: 'Success', msg: 'Pickup updated successfully.' })
    }
   } catch (error: any) {
    return res.status(400).json({ status: 'Failed', msg: 'Pickup update was not successful.' })
    
   }
  
}

export const forgetUserPassword = async (req: Request, res: Response) => {
    const otpMail = sms.VERIFICATION
    try {
       const verifyEmail = await Admin.findOne({ email: req.body.email })
       if(!verifyEmail) throw new Error(JSON.stringify('This email is not registered'))
       //  @ts-ignore
      const reference = await otpMail.sendOTP({ channel: 'email', expiration_time: 5, token_type: "numeric", token_length: 6, customer_email_address: req.body.email, sender: 'butlerdevelopers@gmail.com', meta_data: {
          customer_email_address: req.body.email
      }  })
      console.log(reference);
      if(reference.status !== 'success') throw new Error(JSON.stringify({ status: 'Failed', msg: reference.message, errMsg: reference.data}))
      res.send({ status: 'Success',msg: 'OTP sent', reference: reference.data.reference })
    } catch (error: any) {
        console.log(error.message);
        res.send(JSON.parse(error.message))
        
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    const otpMail = sms.VERIFICATION
    try {
       const verifyEmail = await Admin.findOne({ email: req.body.email })
       if(verifyEmail) throw new Error(JSON.stringify('This email is already registered'))
       //  @ts-ignore
      const reference = await otpMail.sendOTP({ channel: 'email', expiration_time: 5, token_type: "numeric", token_length: 6, customer_email_address: req.body.email, sender: 'butlerdevelopers@gmail.com', meta_data: {
          customer_email_address: req.body.email
      }  })
      console.log(reference);
      if(reference.status !== 'success') throw new Error(JSON.stringify({ status: 'Failed', msg: reference.message, errMsg: reference.data}))
      res.send({ status: 'Success',msg: 'OTP sent', reference: reference.data.reference })
    } catch (error: any) {
        res.send(JSON.parse(error.message))
        
    }
}

export const verifyNewUserOtp = async (req: Request, res: Response) => {
    const otpMail = sms.VERIFICATION
    
    try {
        const verifyOtp = await otpMail.verifyOTP({ verification_code: req.body.code, verification_reference: req.body.reference })
        console.log(verifyOtp);
        if(verifyOtp.status !== 'success') throw new Error(JSON.stringify({ status: 'Failed', msg: verifyOtp.message, errMsg: verifyOtp.data }))
        // @ts-ignore
        res.send({ status: 'Success', msg: 'Verified'})
    } catch (error: any) {
        res.send(JSON.parse(error.message))
    }
  
 }

export const verifyOtp = async (req: Request, res: Response) => {
   const otpMail = sms.VERIFICATION
   
   try {
       const verifyOtp = await otpMail.verifyOTP({ verification_code: req.body.code, verification_reference: req.body.reference })
       console.log(verifyOtp);
       if(verifyOtp.status !== 'success') throw new Error(JSON.stringify({ status: 'Failed', msg: verifyOtp.message, errMsg: verifyOtp.data }))
       // @ts-ignore
       const userEmail = await Admin.findOne({ email: verifyOtp.data.email })
       const token = authUser({ id: userEmail?._id})
       res.send({ status: 'Success', msg: 'Verified', token })
   } catch (error: any) {
       res.send(JSON.parse(error.message))
   }
 
}

export const resetPassword =  async (req: Request, res: Response) => {
   try {
      const verifiedToken = verifyUser(req.params.token)
      if(!verifiedToken) throw new Error('Unauthroized')
      const newPassword = await hashPassword(req.body.password) 
   //   @ts-ignore
     await Admin.updateOne({ _id: verifiedToken.id }, { $set: { password: newPassword } })
      res.status(200).json({ status: 'Success', msg: 'Password updated' })

  } catch (error: any) {
      console.log(error.message)
      res.status(400).send({ status: 'Failed', error: error.message })
  }
}