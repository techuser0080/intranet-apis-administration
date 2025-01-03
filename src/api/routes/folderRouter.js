import { Router } from "express"
import { getFoldersByCompanyId, createFolder } from '../controllers/folderController.js'
import { createFolderValidation, getFoldersByCompanyIdValidation } from "../validations/folderValidation.js"

const router = Router()

router.get('/company/:companyId', getFoldersByCompanyIdValidation, getFoldersByCompanyId)
router.post('', createFolderValidation, createFolder)

export default router