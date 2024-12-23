import { getFoldersByCompanyIdService, createFolderService } from "../services/folderService.js"

export const getFoldersByCompanyId = async(req, res) => {
    const { companyId } = req.params
    const results = await getFoldersByCompanyIdService(companyId)
    res.send(results)
}

export const createFolder = async(req, res) => {
    const { description, companyId, creationUserId } = req.body.folder
    const result = await createFolderService(description, companyId, creationUserId)
    if (result == 2) res.sendStatus(500)
    res.sendStatus(200)
}