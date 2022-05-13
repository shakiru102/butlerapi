import { Router } from "express";
import { adminAuth, adminSignin, adminSignup } from "../controllers/adminController";
import { signInValidation } from "../middlewares";
import { adminSignupValidation } from "../middlewares/adminMiddlewares";
const router = Router()

router.post('/admin/signup', adminSignupValidation, adminSignup)
router.post('/admin/signin', signInValidation, adminSignin)
router.get('/admin/auth', adminAuth)




export default router
