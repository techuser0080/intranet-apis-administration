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

export const getPromptsByConfigFolderIdService = async(companyId) => {
    const [result] = await new Promise((resolve, reject) => {
        pool.query('CALL spGetPromptsByConfigFolderId(?);', [companyId], (err, results) => {
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

export const deleteFolderService = async(folderId) => {
    const result = await new Promise((resolve, reject) => {
        pool.query('CALL spDeleteFolder(?,@statusCode); SELECT @statusCode AS result;', [folderId], (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results[1][0])
        })
    })
    return result
}