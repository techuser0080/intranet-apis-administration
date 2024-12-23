import { Router } from "express";
import { uploadAudioToFolder } from "../controllers/audioController.js"

const router = Router()

router.get('/uploadAudioToFolder/:folderId', uploadAudioToFolder)

export default router