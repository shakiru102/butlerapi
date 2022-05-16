import express, { Request, Response } from 'express'
import http from  'http'
import cors from 'cors'
import env from 'dotenv'
import mongoose from 'mongoose'
import AdminRoutes from './src/routes/adminroutes'
env.config()

const app = express()
const port = process.env.PORT || 8080
const server = http.createServer(app)
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
app.use('/api/v1', [AdminRoutes])
app.get('/', (req: Request, res: Response) => res.status(200).send('Server is running'))

server.listen(port, () => console.log('server runing on Port ' + port))