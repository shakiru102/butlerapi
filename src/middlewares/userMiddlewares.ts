import { NextFunction, Request, Response } from "express"
import { validateSignupUserSchema } from "../utils/validate"

export const userSignupValidation = ( req: Request, res: Response, next: NextFunction) => {
    const { error } = validateSignupUserSchema(req.body)
    if(error) return res.status(400).send({ status: 'Failed', error: error.details[0].message })
    next()
}