"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.adminSignin = exports.adminSignup = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const bcrypt_1 = require("../utils/bcrypt");
const verify_1 = require("../utils/verify");
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, password, phonenumber } = req.body;
        const newPassword = yield (0, bcrypt_1.hashPassword)(password);
        const isNewUser = yield adminModel_1.default.findOne({ email });
        if (isNewUser)
            throw new Error('User already exist');
        const user = yield adminModel_1.default.create({ firstname, lastname, email, password: newPassword, phonenumber });
        const token = (0, verify_1.authUser)({ id: user._id });
        res.status(200).json({ status: 'Success', token });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send({ status: 'Failed', error: error.message });
    }
});
exports.adminSignup = adminSignup;
const adminSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const verifyEmail = yield adminModel_1.default.findOne({ email });
        if (!verifyEmail)
            throw new Error('Invalid Email');
        const verifyPassword = yield (0, bcrypt_1.confirmPassword)(password, verifyEmail.password);
        if (!verifyPassword)
            throw new Error('Invalid Password');
        const token = (0, verify_1.authUser)({ id: verifyEmail._id });
        res.status(200).json({ status: 'Success', token });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send({ status: 'Failed', error: error.message });
    }
});
exports.adminSignin = adminSignin;
const adminAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.slice(7);
        if (!token)
            throw new Error('Unauthorized');
        const verifiedToken = (0, verify_1.verifyUser)(token);
        if (!verifiedToken)
            throw new Error('Unauthroized');
        //    @ts-ignore
        const admin = yield adminModel_1.default.findById({ _id: verifiedToken.id }, { _id: 1, email: 1, firstname: 1, lastname: 1, phonenumber: 1 });
        if (!admin)
            throw new Error('Unauthorized');
        res.status(200).json({ status: 'Success', adminDetails: admin });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send({ status: 'Failed', error: error.message });
    }
});
exports.adminAuth = adminAuth;
