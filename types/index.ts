export interface adminDetails  {
    firstname: string;
    lastname: string;
    phonenumber: string;
    email: string;
    password: string;
    _id?: any;
    confirmPassword: string

}

export interface userDetails  {

    firstname: string;
    lastname: string;
    phonenumber: string;
    address: string;
    email: string;
    password: string;
    _id?: any;
    confirmPassword: string

}

export type PickUpDay = 'Sunday' 
| 'Monday'
| 'Tuesday'
| 'Wednesday'
| 'Thursday'
| 'Friday'
| 'Saturday'

export type PlanTypes = "Laundry" | "Home Cleaning" | "Food"

interface ItemsProps {
    name: string;
    amount: number;
    count: number
}

export type OrderDays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

export type StatusProps = "Pending" | "Pickup" | "Onging" | "Delivery" | "Complete" | "Canceled"

export interface OrderDetails {
  
    serviceType: PlanTypes ;
    servicePlan: "Subscription" | "One-off";
    startDate: any;
    description: string;
    apartmentType: string
    pickUpDay: OrderDays | OrderDays[];
    pickUpDate: any
    endDate: any;
    userID: string;
    pickUpTime: string;
    deliveryDate: any
    quantity: number;
    items: ItemsProps[];
    createdAt: any;
    frequency: Number;
    frequencyCompleted: Number;
    username: string;
    status: StatusProps;
    phonenumber: string;
    pickUpAddress: string;
    deliveryAddress: string;
    amount: Number
}