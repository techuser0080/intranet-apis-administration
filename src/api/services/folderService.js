import { pool } from "../../config/database.js"

export const getFoldersByCompanyIdService = async(companyId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetFoldersByCompanyId(?);', [companyId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const createFolderService = async(description, companyId, creationUserId) => {
    const result = await new Promise((resolve, reject) => {
        console.log(description, companyId, creationUserId)
        pool.query('CALL spCreateFolder(?,?,?,@statusCode); SELECT @statusCode AS result;', [description, companyId, 
            creationUserId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}