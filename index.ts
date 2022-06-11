import express, { Request, Response } from 'express'
import http from  'http'
import cors from 'cors'
import env from 'dotenv'
import socketIO from 'socket.io'
import mongoose from 'mongoose'
import AdminRoutes from './src/routes/adminroutes'
import UserRoutes from './src/routes/userroutes'
import { socket } from './src/socketIO'
import moment from 'moment'
env.config()

const app = express()
const port = process.env.PORT || 8080
const server = http.createServer(app)
// @ts-ignore
export const io = socketIO(server, {
    cors: {
        origin: '*'
    }
})
console.log(moment(Date.now()).format('MM-DD-YYYY'));

socket(io)

const mongooseOptions: object = {
    useUnifiedTopology : true,
}

// @ts-ignore
mongoose.connect(process.env.MONGO_URI, mongooseOptions)
.then(() => console.log('Mongoose connected'))

// @ts-ignore 
.catch(err => console.log(err.message))

app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', AdminRoutes)
app.use('/api/v1', UserRoutes)
app.get('/', (req: Request, res: Response) => res.status(200).send('Server is running'))

server.listen(port, () => console.log('server runing on Port ' + port))