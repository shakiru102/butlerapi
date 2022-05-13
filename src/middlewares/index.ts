import { NextFunction, Request, Response } from "express";
import { validateSigninSchema } from "../utils/validate";

export const signInValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateSigninSchema(req.body)
    if(error) return res.status(400).send({ status: 'Failed', error: error.details[0].message })
    next()
}