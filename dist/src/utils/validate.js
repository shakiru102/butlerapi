"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignupAdminSchema = exports.validateSigninSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const signupAdminSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(8),
    phonenumber: joi_1.default.string().required(),
});
const signinSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(8)
});
const validateSigninSchema = (data) => signinSchema.validate(data);
exports.validateSigninSchema = validateSigninSchema;
const validateSignupAdminSchema = (data) => signupAdminSchema.validate(data);
exports.validateSignupAdminSchema = validateSignupAdminSchema;
