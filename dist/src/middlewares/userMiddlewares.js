"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignupValidation = void 0;
const validate_1 = require("../utils/validate");
const userSignupValidation = (req, res, next) => {
    const { error } = (0, validate_1.validateSignupUserSchema)(req.body);
    if (error)
        return res.status(400).send({ status: 'Failed', error: error.details[0].message });
    next();
};
exports.userSignupValidation = userSignupValidation;
