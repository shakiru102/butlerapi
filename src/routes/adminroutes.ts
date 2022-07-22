import { Router } from "express";
import { adminAuth, adminSignin, adminSignup, forgetUserPassword, getAllOrders, getStatusOrder, resetPassword, updateOrderStatus, updateSubscriptionPickup, verifyOtp } from "../controllers/adminController";
import { resetPasswordValidation, signInValidation } from "../middlewares";
import { adminSignupValidation, adminStatusValidation, adminUpdateSubscriptionValidation } from "../middlewares/adminMiddlewares";
const router = Router()

router.post('/admin/signup', adminSignupValidation, adminSignup)
router.post('/admin/signin', signInValidation, adminSignin)
router.get('/admin/auth', adminAuth)
router.get('/admin/getOrders', getAllOrders)
router.get('/admin/currentStatusOrder', getStatusOrder)
router.post('/admin/:orderID/updeteOrder', adminStatusValidation , updateOrderStatus)
router.post('/admin/:orderID/subscriptionUpdate', adminUpdateSubscriptionValidation , updateSubscriptionPickup)
router.post('/admin/forgetpasssword', forgetUserPassword)
router.post('/admin/verifyotp', verifyOtp)
router.post('/admin/:token/resetpassword', resetPasswordValidation , resetPassword)





export default router
