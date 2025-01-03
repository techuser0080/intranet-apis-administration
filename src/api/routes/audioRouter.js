import { Router } from "express";
import { uploadAudioToFolder } from "../controllers/audioController.js"
import { uploadFileValidation } from "../validations/uploadFileValidation.js";

const router = Router()

router.post('/uploadAudioToFolder/:folderId', uploadFileValidation, uploadAudioToFolder)

export default router