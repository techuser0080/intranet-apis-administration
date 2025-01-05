import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch(e) {
        console.log(e)
        res.status(403).send({ errors: e.array })
    }
}