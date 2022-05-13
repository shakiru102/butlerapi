"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidation = void 0;
const validate_1 = require("../utils/validate");
const signInValidation = (req, res, next) => {
    const { error } = (0, validate_1.validateSigninSchema)(req.body);
    if (error)
        return res.status(400).send({ status: 'Failed', error: error.details[0].message });
    next();
};
exports.signInValidation = signInValidation;
