import { getFoldersByCompanyId, createFolder } from "../services/folderService"

const getFoldersByCompanyId = async(req, res) => {
    const { companyId } = req.params
    const results = await getFoldersByCompanyId(companyId)
    res.send(results)
}

const createFolder = async(req, res) => {
    const { description, companyId, creationUserId } = req.body.folder
    const result = await createFolder(description, companyId, creationUserId)
    if (result == 2) res.sendStatus(500)
    res.sendStatus(200)
}

module.exports = {
    getFoldersByCompanyId
}