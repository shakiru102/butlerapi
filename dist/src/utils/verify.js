"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// @ts-ignoree
const authUser = (id) => jsonwebtoken_1.default.sign(id, process.env.JWT, { expiresIn: 24 * 60 * 60 });
exports.authUser = authUser;
// @ts-ignore
const verifyUser = (id) => jsonwebtoken_1.default.verify(id, process.env.JWT);
exports.verifyUser = verifyUser;
