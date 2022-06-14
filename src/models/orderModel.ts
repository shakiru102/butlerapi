import { model, Schema } from "mongoose";
import { OrderDetails } from "../../types";

const orderSchema = new Schema<OrderDetails>({

    userID: String,
    apartmentType: String,
    description: String,
    endDate: String,
    items: [{ name: String, amount: Number, count: Number }],
    createdAt: { 
        type: Date,
        default: Date.now()
     },
     pickUpDay: Schema.Types.Mixed,
     pickUpTime: String,
     quantity: Number,
     servicePlan: String,
     serviceType: String,
     startDate: String,
     frequency: Number,
     frequencyCompleted: Number,
     deliveryDate: String,
     pickUpDate: String,
     username: String,
     phonenumber: String,
     status: String,
     deliveryAddress: String,
     pickUpAddress: String,
     reference: String
})

 const Order =  model<OrderDetails>('orders', orderSchema)

 export default Order