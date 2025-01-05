import { check } from "express-validator"
import { validateResult } from "../helpers/validationHelper.js"

export const getFoldersByCompanyIdValidation = [
    check('companyId').exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const createFolderValidation = [
    check('description').exists().not().isEmpty(),
    check('companyId').exists().not().isEmpty().isNumeric(),
    check('creationUserId').exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]