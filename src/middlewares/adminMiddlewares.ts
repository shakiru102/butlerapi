import { NextFunction, Request, Response } from "express"
import Order from "../models/orderModel"
import { validateSignupAdminSchema, validateUpdateStatus } from "../utils/validate"

export const adminSignupValidation = ( req: Request, res: Response, next: NextFunction) => {
    const { error } = validateSignupAdminSchema(req.body)
    if(error) return res.status(400).send({ status: 'Failed', error: error.details[0].message })
    next()
}

export const adminStatusValidation = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findById({ _id: req.params.orderID })
    if(!order) throw new Error('Invalid order id parameter')
    const { error } = validateUpdateStatus(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next()
    } catch (error: any) {
        return res.status(400).send({ status: 'Failed', error: 'Invalid order id parameter' })
    }
}
