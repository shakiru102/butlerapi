import { Router } from "express";
import { verifyNewUserOtp } from "../controllers/adminController";
import { forgetUserPassword, getUserSubscription, resetPassword, userAuth, userSignin, userSignup, verifyEmail, verifyOtp} from "../controllers/userController";
import { resetPasswordValidation, signInValidation } from "../middlewares";
import { userSignupValidation } from "../middlewares/userMiddlewares";
const router = Router()

router.post('/user/signup', userSignupValidation, userSignup)
router.post('/user/signin', signInValidation, userSignin)
router.post('/user/forgetpasssword', forgetUserPassword)
router.post('/user/verifyotp', verifyOtp)
router.post('/user/verifEmail', verifyEmail)
router.post('/user/verifNewUserOtp', verifyNewUserOtp)
router.post('/user/:token/resetpassword', resetPasswordValidation , resetPassword)
router.get('/user/auth', userAuth)
router.get('/user/subscription', getUserSubscription)


export default router