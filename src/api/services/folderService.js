import { pool } from "../../config/database"

const getFoldersByCompanyId = async(req, res) => {
    const companyId = req.params.companyId
    const [rows] = await pool.query('CALL spGetFoldersByCompanyId(?)', [companyId], (err, results) => {
        if (err) return callback(err)
        return results
    })
    return rows
}

const createFolder = async(req, res) => {
    const { description, companyId, creationUserId } = req.params
    const result = await pool.query('CALL spCreateFolder(?,?,?,@statusCode); SELECT @statusCode', [description, companyId, 
        creationUserId], (err, results) => {
            if (err) return callback(err)
            return results
    })
    return result
}

exports = {
    getFoldersByCompanyId,
    createFolder
}