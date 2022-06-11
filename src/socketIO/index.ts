import moment from "moment"
import { Socket } from "socket.io"
import { OrderDetails, StatusProps } from "../../types"
import Order from "../models/orderModel"

// @ts-ignore
export const socket = io => {
    io.on('connection', (socket: Socket) => {

      // Initiate Admin 
      socket.on('initiateAdmin', () => socket.join('admin'))

      // Initiate Users
      socket.on('initiateUser', userID => socket.join(userID))

      
     
  //  Initiate Payment
      socket.on('user-pay', async (order: OrderDetails) => {
       

        try {
          await Order.create({...order, status: 'Pending' })
       if(order.servicePlan === 'Subscription') {
          switch(order.serviceType) {
             case 'Food' :
              socket.broadcast.to('admin').emit('Food', { count: 1 })
              break
            case 'Home Cleaning' :
                socket.broadcast.to('admin').emit('Home Cleaning', { count: 1 })
               break
            default :
                socket.broadcast.to('admin').emit('Laundry', { count: 1 })
              break 
          }
       }
       else socket.broadcast.to('admin').emit('one-off', { count: 1 })
       io.to(order.userID).emit('saved', { acknowlegde: true })
        } catch (error: any) {
          console.log(error.message);
          io.to(order.userID).emit('err', { acknowlegde: false })
        }
       
        if(order.pickUpDate === moment().format('MM-DD-YYYY')) socket.broadcast.to('admin').emit('Pending', { count: 1 })

      })
  
      //  Status Controllers
      
      // interface GetStatusProp { adminID: string; task: StatusProps }

      // socket.on('getStatus', async ({ adminID, task }: GetStatusProp) => {
      //      socket.join(adminID)
      //      switch (task) {
      //        case 'Pending':
      //          const getPending = await Order.find({ status: task, pickUpDate: moment().format('MM-DD-YYYY') })
      //          return io.to(adminID).emit('getPending', getPending)
      //         case 'Pickup':
      //           const getPickup = await Order.find({ status: task, pickUpDate: moment().format('MM-DD-YYYY') })
      //           return io.to(adminID).emit('getPickup', getPickup) 
      //         case 'Onging':
      //           const getOnging = await Order.find({ status: task }).sort({ pickUpDate: 1 })
      //           return io.to(adminID).emit('getOnging', getOnging)
      //         case 'Delivery':
      //           const getDelivery = await Order.find({ status: task, deliveryDate: moment().format('MM-DD-YYYY') })
      //           return io.to(adminID).emit('getDelivery', getDelivery)     
      //        default:
      //         const getTask = await Order.find({ status: task, deliveryDate: moment().format('MM-DD-YYYY') })
      //         return io.to(adminID).emit('getTask', getTask)
      //      }
          
      // })
     

      
    })
   
    
}

