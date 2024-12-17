import { pool } from "../../config/database"

const uploadAudioToFolder = async(folderId, creationUserId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUplaodAudioToFolder(?,?,@statusCode); SELECT @statusCode', [folderId, 
            creationUserId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

module.exports = {
    uploadAudioToFolder
}