"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const middlewares_1 = require("../middlewares");
const userMiddlewares_1 = require("../middlewares/userMiddlewares");
const router = (0, express_1.Router)();
router.post('/user/signup', userMiddlewares_1.userSignupValidation, userController_1.userSignup);
router.post('/user/signin', middlewares_1.signInValidation, userController_1.userSignin);
router.get('/user/auth', userController_1.userAuth);
exports.default = router;
