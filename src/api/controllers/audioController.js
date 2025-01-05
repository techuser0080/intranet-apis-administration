import { Constants } from "../../config/constants.js"
import { responseBody } from "../../config/responseEntity.js"
import { uploadAudioToFolderService } from "../services/audioService.js"

export const uploadAudioToFolder = async(req, res) => {
    try {
        const { folderId } = req.params
        const { creationUserId } = req.body
        const { result } = await uploadAudioToFolderService(folderId, creationUserId)
        if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        console.log(error)
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}