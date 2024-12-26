import { pool } from "../../config/database.js"

export const uploadAudioToFolderService = async(folderId, creationUserId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUploadAudioToFolder(?,?,@statusCode); SELECT @statusCode AS result;', [folderId, 
            creationUserId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}