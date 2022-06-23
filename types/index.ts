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

export type PlanTypes = "Laundry" | "Cleaning" | "Food"

interface ItemsProps {
    name: string;
    amount: number;
    count: number
}

export type OrderDays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

export type StatusProps = "Pending" | "Pickup" | "Onging" | "Delivery" | "Complete" | "Cancelled"

export interface OrderDetails {
  
    serviceType: PlanTypes ;
    servicePlan: "Subscription" | "One-off";
    startDate: string;
    description: string;
    apartmentType: string
    pickUpDay: OrderDays | OrderDays[];
    pickUpDate: string;
    endDate: string;
    userID: string;
    pickUpTime: string;
    deliveryDate: any
    quantity: number;
    items: ItemsProps[];
    createdAt: any;
    frequency: number;
    frequencyCompleted: number;
    username: string;
    status: StatusProps;
    phonenumber: string;
    pickUpAddress: string;
    deliveryAddress: string;
    amount: number;
    reference: string;
}