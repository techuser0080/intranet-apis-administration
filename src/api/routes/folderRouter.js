import { Router } from "express"
import { getFoldersByCompanyId, createFolder } from '../controllers/folderController.js'

const router = Router()

router.get('/company/:companyId', getFoldersByCompanyId)
router.post('', createFolder)

export default router