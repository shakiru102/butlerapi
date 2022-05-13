import { NextFunction, Request, Response } from "express"
import { validateSignupAdminSchema } from "../utils/validate"

export const adminSignupValidation = ( req: Request, res: Response, next: NextFunction) => {
    const { error } = validateSignupAdminSchema(req.body)
    if(error) return res.status(400).send({ status: 'Failed', error: error.details[0].message })
    next()
}