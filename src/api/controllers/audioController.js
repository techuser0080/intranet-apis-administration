import { uploadAudioToFolderService } from "../services/audioService.js"

export const uploadAudioToFolder = async(req, res) => {
    const { folderId } = req.params
    const { creationUserId } = req.body
    const { result } = await uploadAudioToFolderService(folderId, creationUserId)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}