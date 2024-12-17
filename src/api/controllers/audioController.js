import { uploadAudioToFolder } from "../services/audioService"

const uploadAudioToFolder = async(req, res) => {
    const { folderId, creationUserId } = req.params
    const result = await uploadAudioToFolder(folderId, creationUserId)
    if(result == 2) res.sendStatus(500)
    res.sendStatus(200)
}

module.exports = {
    uploadAudioToFolder
}