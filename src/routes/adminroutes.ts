import { Router } from "express";
import { adminAuth, adminSignin, adminSignup, getAllOrders, getStatusOrder, updateOrderStatus, updateSubscriptionPickup } from "../controllers/adminController";
import { signInValidation } from "../middlewares";
import { adminSignupValidation, adminStatusValidation, adminUpdateSubscriptionValidation } from "../middlewares/adminMiddlewares";
const router = Router()

router.post('/admin/signup', adminSignupValidation, adminSignup)
router.post('/admin/signin', signInValidation, adminSignin)
router.get('/admin/auth', adminAuth)
router.get('/admin/getOrders', getAllOrders)
router.get('/admin/currentStatusOrder', getStatusOrder)
router.post('/admin/:orderID/updeteOrder', adminStatusValidation , updateOrderStatus)
router.post('/admin/:orderID/subscriptionUpdate', adminUpdateSubscriptionValidation , updateSubscriptionPickup)





export default router
