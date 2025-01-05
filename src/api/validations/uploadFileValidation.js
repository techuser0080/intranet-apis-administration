import { check } from "express-validator"
import { validateResult } from "../helpers/validationHelper.js"

export const uploadFileValidation = [
    check('folderId').exists().not().isEmpty().isNumeric(),
    check('creationUserId').exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]