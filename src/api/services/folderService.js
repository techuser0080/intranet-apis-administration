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

export const getFoldersByFolderConfigIdService = async(folderConfigId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetFoldersByFolderConfigId(?);', [folderConfigId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const getAudioResponseByFolderIdAndFolderConfigIdService = async(folderId, folderConfigId) => {
    const [rows] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetAudioResponseByFolderIdAndFolderConfigId(?,?);', [folderId, folderConfigId], (err, results) => {
            if (err) reject(new Error(err.message))
            resolve(results)
        })
    })
    return rows
}

export const createFolderService = async(description, companyId, creationUserId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreateFolder(?,?,?,@statusCode); SELECT @statusCode AS result;', [description, companyId, 
            creationUserId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const getConfigFoldersByCompanyIdService = async(companyId) => {
    const [result] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetConfigFoldersByCompanyId(?);', [companyId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

export const getNoProcessedAudiosByFolderIdService = async(folderId) => {
    const [result] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetNoProcessedAudiosByFolderId(?);', [folderId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

export const getPromptsByConfigFolderIdAndFolderIdService = async(folderConfigId, folderId) => {
    const [result] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetPromptsByFolderConfigIdAndFolderId(?,?);', [folderConfigId, folderId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
        })
    })
    return result
}

export const createConfigFolderService = async(description, companyId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreateConfigFolder(?,?,@statusCode); SELECT @statusCode AS result;', [description, 
            companyId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const createAudioResponseService = async(audioId, response, response1, response2, response3, response4, response5,
                                                response6, response7, response8, response9, response10, response11,
                                                response12, response13, response14, response15, response16, response17,
                                                response18, response19, response20, response21, response22, response23,
                                                response24, response25, response26, response27, response28, response29,
                                                response30) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreateAudioResponse(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@statusCode); SELECT @statusCode AS result;', [audioId, 
            response, response1, response2, response3, response4, response5, response6, response7, response8, response9, response10,
            response11, response12, response13, response14, response15, response16, response17, response18, response19,
            response20, response21, response22, response23, response24, response25, response26, response27, response28, response29,
            response30], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const createPromptService = async(prompt, instruction, model, folderId, folderConfigId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spCreatePrompt(?,?,?,?,?,@statusCode); SELECT @statusCode AS result;', [prompt, 
            instruction, model, folderId, folderConfigId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const updateFolderService = async(description, folderId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUpdateFolder(?,?,@statusCode); SELECT @statusCode AS result;', [description, folderId], (err, results) => {
                if (err) reject(new Error(err.message))
                    console.log(results)
                resolve(results[1][0])
        })
    })
    return result
}

export const updatePromptService = async(promptId, prompt, instruction) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUpdatePrompt(?,?,?,@statusCode); SELECT @statusCode AS result;', [promptId, prompt, instruction], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const updateAudioStatusProcessedService = async(audioId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUpdateStatusProcessedAudio(?,@statusCode); SELECT @statusCode AS resultStatus;', [audioId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const updateProcessedAudiosByFolderIdService = async(folderId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUpdateProcessedAudiosByFolderId(?,@statusCode); SELECT @statusCode AS resultStatus;', [folderId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const updateAnalizedAudiosByFolderIdService = async(folderId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spUpdateAnalizedAudiosByFolderId(?,@statusCode); SELECT @statusCode AS resultStatusAnalizedAudios;', [folderId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}

export const deleteFolderService = async(folderId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spDeleteFolder(?,@statusCode); SELECT @statusCode AS result;', [folderId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}