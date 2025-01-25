import { Router } from "express"
import { getFoldersByCompanyId, createFolder, updateFolder, deleteFolder, getConfigFoldersByCompanyId, createConfigFolder, getPromptsByConfigFolderId, createPrompt } from '../controllers/folderController.js'
import { createFolderValidation, getFoldersByCompanyIdValidation } from "../validations/folderValidation.js"

const router = Router()

router.get('/company/:companyId', getFoldersByCompanyIdValidation, getFoldersByCompanyId)
router.get('/configfolder/company/:companyId', getConfigFoldersByCompanyId)
router.get('/prompt/configfolder/:configFolderId', getPromptsByConfigFolderId)
router.post('', createFolderValidation, createFolder)
router.post('/configfolder', createConfigFolder)
router.post('/prompt', createPrompt)

router.put('/:folderId', updateFolder)
router.delete('/:folderId', deleteFolder)

export default router