import { Constants } from "../../config/constants.js"
import { uploadAudioToFolderService } from "../services/audioService.js"

export const uploadAudioToFolder = async(req, res) => {
    try {
        const { folderId } = req.params
        const { creationUserId } = req.body
        const { result } = await uploadAudioToFolderService(folderId, creationUserId)
        if (result == null) res.sendStatus(500).json(2, Constants.MESSAGE_STATUS_ERROR, null)
        if (result == 2) res.sendStatus(500).json(2, Constants.MESSAGE_STATUS_ERROR, null)
        res.sendStatus(200).json(2, Constants.MESSAGE_STATUS_ERROR, null)
    } catch (error) {
        res.sendStatus(500).json(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}