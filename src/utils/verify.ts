import jwt from 'jsonwebtoken'

// @ts-ignoree
export const authUser = (id: object) => jwt.sign( id, process.env.JWT, { expiresIn: 24 * 60 * 60} )
// @ts-ignore
export const verifyUser = (id: string) => jwt.verify(id, process.env.JWT)