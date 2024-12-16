import { pool } from "../../config/database"

const uploadAudioToFolder = async(folderId, creationUserId) => {
    const result = await pool.query('CALL spUploadAudioToFolder(?,?,@statusCode); SELECT @statusCode;', [folderId,
         creationUserId, (err, results) => {
            if (err) return callback(err)
            return results
         }])
    return result
}

exports = {
    uploadAudioToFolder
}