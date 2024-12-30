import { Constants } from "../../config/constants.js"
import { getFoldersByCompanyIdService, createFolderService } from "../services/folderService.js"

export const getFoldersByCompanyId = async(req, res) => {
    try {
        const { companyId } = req.params
        const results = await getFoldersByCompanyIdService(companyId)
        res.sendStatus(200).json(1, Constants.MESSAGE_STATUS_OK, results)
    } catch (error) {
        res.sendStatus(500).json(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}

export const createFolder = async(req, res) => {
    try {
        const { description, companyId, creationUserId } = req.body
        const { result } = await createFolderService(description, companyId, creationUserId)
        if (result == null) res.sendStatus(2, Constants.MESSAGE_STATUS_ERROR, null)
        if (result == 2) res.sendStatus(500).json(2, Constants.MESSAGE_STATUS_ERROR, null)
        res.sendStatus(200).json(1, Constants.MESSAGE_STATUS_OK, null)
    } catch (error) {
        res.sendStatus(500).json(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}