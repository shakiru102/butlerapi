import mongoose from 'mongoose'
import { userDetails } from '../../types'


const schema = new mongoose.Schema<userDetails>({
     email: String,
     password: String,
     firstname: String,
     lastname: String,
     phonenumber: String,
     address: String
})


const User = mongoose.model<userDetails>('users', schema)

export default User