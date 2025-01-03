import { Constants } from "../../config/constants.js"
import { uploadAudioToFolderService } from "../services/audioService.js"

export const uploadAudioToFolder = async(req, res) => {
    try {
        const { folderId } = req.params
        const { creationUserId } = req.body
        const result = await uploadAudioToFolderService(folderId, creationUserId)
        if (result == null) res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
        if (result != 1) res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
        res.status(200).send(1, Constants.MESSAGE_STATUS_ERROR, null)
    } catch (error) {
        res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}