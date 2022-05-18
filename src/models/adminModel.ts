import mongoose from 'mongoose'
import { adminDetails } from '../../types'


const schema = new mongoose.Schema<adminDetails>({
     email: String,
     password: String,
     firstname: String,
     lastname: String,
     phonenumber: String,
})


const Admin = mongoose.model<adminDetails>('admins', schema)

export default Admin