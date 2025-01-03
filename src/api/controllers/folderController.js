import { Constants } from "../../config/constants.js"
import { responseBody } from "../../config/responseEntity.js"
import { getFoldersByCompanyIdService, createFolderService } from "../services/folderService.js"

export const getFoldersByCompanyId = async(req, res) => {
    try {
        const { companyId } = req.params
        const rows = await getFoldersByCompanyIdService(companyId)
        if (rows == null) res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) res.status(500).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        res.status(200).send(1, Constants.MESSAGE_STATUS_OK, results)
    } catch (error) {
        res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}

export const createFolder = async(req, res) => {
    try {
        const { description, companyId, creationUserId } = req.body
        const result = await createFolderService(description, companyId, creationUserId)
        if (result == null) res.sendStatus(2, Constants.MESSAGE_STATUS_ERROR, null)
        if (result != 1) res.sendStatus(500).json(2, Constants.MESSAGE_STATUS_ERROR, null)
        res.status(200).send(1, Constants.MESSAGE_STATUS_OK, null)
    } catch (error) {
        res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}