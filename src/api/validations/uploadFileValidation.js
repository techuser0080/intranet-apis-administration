import { check } from "express-validator"
import { validateResult } from "../helpers/validationHelper.js"

export const uploadFileValidation = [
    check('name').exists().not().isEmpty(),
    check('lastName').exists().not().isEmpty(),
    check('email').exists().not().isEmpty().isEmail(),
    check('age').exists().not().isEmpty().isNumeric(),
    check('gender').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]