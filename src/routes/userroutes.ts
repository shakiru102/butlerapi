import { Router } from "express";
import { userAuth, userSignin, userSignup } from "../controllers/userController";
import { signInValidation } from "../middlewares";
import { userSignupValidation } from "../middlewares/userMiddlewares";
const router = Router()

router.post('/user/signup', userSignupValidation, userSignup)
router.post('/user/signin', signInValidation, userSignin)
router.get('/user/auth', userAuth)


export default router