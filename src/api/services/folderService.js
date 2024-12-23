import { pool } from "../../config/database.js"

export const getFoldersByCompanyIdService = async(companyId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetFoldersByCompanyId(?)', [companyId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const createFolderService = async(description, companyId, creationUserId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreateFolder(?,?,?,@statusCode); SELECT @statusCode', [description, companyId, 
            creationUserId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}