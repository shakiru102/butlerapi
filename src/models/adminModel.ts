import mongoose from 'mongoose'
import { userDetails } from '../../types'


const schema = new mongoose.Schema<userDetails>({
     email: String,
     password: String,
     firstname: String,
     lastname: String,
     phonenumber: String,
})

const Admin = mongoose.model<userDetails>('admins', schema)

export default Admin