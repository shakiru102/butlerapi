"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    phonenumber: String,
    address: String
});
const User = mongoose_1.default.model('users', schema);
exports.default = User;
