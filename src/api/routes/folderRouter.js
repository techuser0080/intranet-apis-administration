import { Router } from "express"
import { getFoldersByCompanyId, createFolder, updateFolder, deleteFolder, getConfigFoldersByCompanyId, createConfigFolder, createPrompt, getPromptsByConfigFolderIdAndFolderId, getFoldersByFolderConfigId, getAudioResponseByFolderIdAndFolderConfigId, getAudioResponseByFolderIdAndFolderConfigIdJson, uploadAudiosToFolder, analizeAudiosByFolderIdAndModel, updatePrompt } from '../controllers/folderController.js'
import { createFolderValidation, getFoldersByCompanyIdValidation } from "../validations/folderValidation.js"
import multer from "multer"

const router = Router()

const uploads = multer({ dest: import.meta.dirname + '/uploads'})

router.get('/company/:companyId', getFoldersByCompanyIdValidation, getFoldersByCompanyId)
router.get('/configfolder/:configFolderId', getFoldersByFolderConfigId)
router.get('/:folderId/configfolder/:configFolderId/audioResponse/csv', getAudioResponseByFolderIdAndFolderConfigId)
router.get('/:folderId/configfolder/:configFolderId/audioResponse', getAudioResponseByFolderIdAndFolderConfigIdJson)
router.get('/configfolder/company/:companyId', getConfigFoldersByCompanyId)
router.get('/prompt/configfolder/:configFolderId/folder/:folderId', getPromptsByConfigFolderIdAndFolderId)
router.post('', createFolderValidation, createFolder)
router.post('/:folderId/uploadAudios', uploads.any("files"), uploadAudiosToFolder)
router.post('/:folderId/model/:model/analizeProcessedAudios', analizeAudiosByFolderIdAndModel)
router.post('/configfolder', createConfigFolder)
router.post('/prompt', createPrompt)
router.put('/prompt/:promptId', updatePrompt)

router.put('/:folderId', updateFolder)
router.delete('/:folderId', deleteFolder)

export default router