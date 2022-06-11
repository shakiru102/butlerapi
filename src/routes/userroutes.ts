import { Router } from "express";
import { forgetUserPassword, getUserSubscription, userAuth, userSignin, userSignup } from "../controllers/userController";
import { signInValidation } from "../middlewares";
import { userSignupValidation } from "../middlewares/userMiddlewares";
const router = Router()

router.post('/user/signup', userSignupValidation, userSignup)
router.post('/user/signin', signInValidation, userSignin)
router.post('/user/forgetpasssword', forgetUserPassword)
router.get('/user/auth', userAuth)
router.get('/user/subscription', getUserSubscription)


export default router