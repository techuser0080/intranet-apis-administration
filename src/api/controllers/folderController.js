import { Constants } from "../../config/constants.js"
import { responseBody } from "../../config/responseEntity.js"
import json2csv from 'json2csv'
import { getFoldersByCompanyIdService, createFolderService, updateFolderService, deleteFolderService, createConfigFolderService, getConfigFoldersByCompanyIdService, createPromptService, getPromptsByConfigFolderIdAndFolderIdService, getFoldersByFolderConfigIdService, getAudioResponseByFolderIdAndFolderConfigIdService, getNoProcessedAudiosByFolderIdService, createAudioResponseService, updateAudioStatusProcessedService, updateProcessedAudiosByFolderIdService, updateAnalizedAudiosByFolderIdService, updatePromptService } from "../services/folderService.js"
import { uploadAudioToFolderService } from "../services/audioService.js"
import fs from 'fs'
import { createClient } from "@deepgram/sdk"
import OpenAi from 'openai'

export const getFoldersByCompanyId = async(req, res) => {
    try {
        const { companyId } = req.params
        const rows = await getFoldersByCompanyIdService(companyId)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        console.log(error)
        res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}

export const getFoldersByFolderConfigId = async(req, res) => {
    try {
        const { configFolderId } = req.params
        const rows = await getFoldersByFolderConfigIdService(configFolderId)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        console.log(error)
        res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}

export const getAudioResponseByFolderIdAndFolderConfigId = async(req, res) => {
    try {
        const { folderId, configFolderId } = req.params
        const rows = await getAudioResponseByFolderIdAndFolderConfigIdService(folderId, configFolderId)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        const fields = ['transcript', 'audioResponseId', 'description', 'audioId', 'date', 'response1', 'response2', 'response3', 'response4', 'response5', 'response6', 'response7', 'response8', 'response9', 'response10', 'response11', 'response12', 'response13', 'response14', 'response15', 'response16', 'response17', 'response18', 'response19', 'response20', 'response21', 'response22', 'response23', 'response24', 'response25', 'response26', 'response27', 'response28', 'response29', 'response30']
        const csvRows = json2csv.parse({ data: rows , fields: fields })
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, csvRows))
    } catch (error) {
        console.log(error)
        res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}

export const getAudioResponseByFolderIdAndFolderConfigIdJson = async(req, res) => {
    try {
        const { folderId, configFolderId } = req.params
        const rows = await getAudioResponseByFolderIdAndFolderConfigIdService(folderId, configFolderId)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        console.log(error)
        res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}

export const getConfigFoldersByCompanyId = async(req, res) => {
    try {
        const { companyId } = req.params
        const rows = await getConfigFoldersByCompanyIdService(companyId)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        console.log(error)
        res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}

export const getPromptsByConfigFolderIdAndFolderId = async(req, res) => {
    try {
        const { configFolderId, folderId } = req.params
        const rows = await getPromptsByConfigFolderIdAndFolderIdService(configFolderId, folderId)
        if (rows == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (rows.length <= 0) return res.status(200).send(responseBody(3, Constants.MESSAGE_NO_RESULTS_FOUND, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, rows))
    } catch (error) {
        console.log(error)
        res.status(500).send(2, Constants.MESSAGE_STATUS_ERROR, null)
    }
}

export const createConfigFolder = async(req, res) => {
    try {
        const { description, companyId } = req.body
        const { result } = await createConfigFolderService(description, companyId)
        if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const createPrompt = async(req, res) => {
    try {
        const { prompt, instruction, model, folders, folderConfigId } = req.body
        for (const folder of folders) {
            const { result } = await createPromptService(prompt, instruction, model, folder, folderConfigId)
            if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            if (result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        }
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const createFolder = async(req, res) => {
    try {
        const { description, companyId, creationUserId } = req.body
        const { result } = await createFolderService(description, companyId, creationUserId)
        if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const uploadAudiosToFolder = async(req, res) => {
    try {
        const { folderId } = req.params
        const { creationUserId } = req.body
        const deepGramApiKey = process.env.DEEPGRAM_APIKEY
        for (const audio of req.files) {
            const deepgram = createClient(deepGramApiKey)
            const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
                fs.readFileSync(audio.path),
                {
                    model: 'nova-2',
                    smart_format: true,
                    language: 'es',
                    diarize: true
                }
            )
            const resultService = (!error) ? await uploadAudioToFolderService(folderId, result.results.channels[0].alternatives[0].transcript, creationUserId) : null
            if (resultService.result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            if (resultService.result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            const { resultStatus } = await updateProcessedAudiosByFolderIdService(folderId)
            if (resultStatus == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            if (resultStatus != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            fs.unlinkSync(audio.path)
        }
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        console.log(error)
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const updateFolder = async(req, res) => {
    try {
        const { folderId } = req.params
        const { description } = req.body
        const { result } = await updateFolderService(description, folderId)
        if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const updatePrompt = async(req, res) => {
    try {
        const { promptId } = req.params
        const { prompt, instruction } = req.body
        const { result } = await updatePromptService(promptId, prompt, instruction)
        if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const analizeAudiosByFolderIdAndModel = async(req, res) => {
    try {
        const { folderId, model } = req.params
        const { prompt, instruction } = req.body
        const rows = await getNoProcessedAudiosByFolderIdService(folderId)
        const openAiApikey = process.env.OPENAI_APIKEY
        for (let i = 0; i < rows.length; i++) {
            const client = new OpenAi({
                apiKey: openAiApikey
            })
            const chatCompletion = await client.chat.completions.create({
                messages: [{'role': 'system', 'content': instruction},
                           {'role': 'user', 'content': rows[i].transcript},
                           {'role': 'user', 'content': prompt}
                ],
                model: model
            })
            const responseAudio = chatCompletion.choices[0].message['content']
            const responseAudio_array = responseAudio.trim().split('\n')
            const valores = responseAudio_array.map(linea => linea.split(". ")[1])
            let response1 = valores[0] ? valores[0].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response2 = valores[1] ? valores[1].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response3 = valores[2] ? valores[2].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response4 = valores[3] ? valores[3].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response5 = valores[4] ? valores[4].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response6 = valores[5] ? valores[5].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response7 = valores[6] ? valores[6].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response8 = valores[7] ? valores[7].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response9 = valores[8] ? valores[8].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response10 = valores[9] ? valores[9].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response11 = valores[10] ? valores[10].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response12 = valores[11] ? valores[11].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response13 = valores[12] ? valores[12].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response14 = valores[13] ? valores[13].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response15 = valores[14] ? valores[14].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response16 = valores[15] ? valores[15].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response17 = valores[16] ? valores[16].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response18 = valores[17] ? valores[17].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response19 = valores[18] ? valores[18].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response20 = valores[19] ? valores[19].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response21 = valores[20] ? valores[20].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response22 = valores[21] ? valores[21].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response23 = valores[22] ? valores[22].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response24 = valores[23] ? valores[23].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response25 = valores[24] ? valores[24].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response26 = valores[25] ? valores[25].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response27 = valores[26] ? valores[26].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response28 = valores[27] ? valores[27].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response29 = valores[28] ? valores[28].replace(/^\s*/, "").replace(/\s*$/, "") : null
            let response30 = valores[29] ? valores[29].replace(/^\s*/, "").replace(/\s*$/, "") : null
            const { result } = await createAudioResponseService(rows[i].audioId, responseAudio, response1, response2, response3, response4,
                response5, response6, response7, response8, response9, response10, response11, response12, response13, response14,
                response15, response16, response17, response18, response19, response20, response21, response22, response23,
                response24, response25, response26, response27, response28, response29, response30)
            if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            if (result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            const { resultStatus } = await updateAudioStatusProcessedService(rows[i].audioId)
            if (resultStatus == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            if (resultStatus != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            const { resultStatusAnalizedAudios } = await updateAnalizedAudiosByFolderIdService(folderId)
            if (resultStatusAnalizedAudios == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            if (resultStatusAnalizedAudios != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
            }
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        console.log(error)
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}

export const deleteFolder = async(req, res) => {
    try {
        const { folderId } = req.params
        const { result } = await deleteFolderService(folderId)
        if (result == null) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        if (result != 1) return res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
        return res.status(200).send(responseBody(1, Constants.MESSAGE_STATUS_OK, null))
    } catch (error) {
        res.status(500).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
}