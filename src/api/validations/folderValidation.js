import { check } from "express-validator"
import { validateResult } from "../helpers/validationHelper.js"

export const getFoldersByCompanyIdValidation = [
    check('folderId').exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const createFolderValidation = [
    check('name').exists().not().isEmpty(),
    check('lastName').exists().not().isEmpty(),
    check('email').exists().not().isEmpty().isEmail(),
    check('age').exists().not().isEmpty().isNumeric(),
    check('gender').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]