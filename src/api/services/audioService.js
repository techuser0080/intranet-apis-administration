import { pool } from "../../config/database.js"

export const uploadAudioToFolderService = async(folderId, transcript, creationUserId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUploadAudioToFolder(?,?,?,@statusCode); SELECT @statusCode AS result;', [folderId, transcript, 
            creationUserId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}