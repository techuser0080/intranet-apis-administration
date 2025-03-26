import express from 'express'
import jwt from 'jsonwebtoken'
import folderRouter from './api/routes/folderRouter.js'
import audioRouter from './api/routes/audioRouter.js'
import { Constants } from './config/constants.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { responseBody } from './config/responseEntity.js'
import dotenv from 'dotenv'

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(dotenv.config())
app.use(cookieParser())
app.use(cors({
    credentials: true, 
    origin: true
}))

app.use((req, res, next) => {
    if (req.path == '/api/folder/:folderId/configfolder/:configFolderId/audioResponse') return next()
    const tokenHeaderAuthorization = req.header('Authorization') ? String(req.header('Authorization').substring(7, req.header('Authorization').length)) : ''
    const token = req.cookies.access_token || tokenHeaderAuthorization
    req.session = { user: null }

    try {
        if (token && String(token).length > 0 ) {
            const data = jwt.verify(token, Constants.JWT_SECRET_SIGNATURE_NAME)
            req.session.user = data
            next()
        } else return res.status(401).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    } catch(error) {
        return res.status(401).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
})

app.use('/api/folder', folderRouter)
app.use('/api/audio', audioRouter)

const main = () => {
    app.listen(port)
    console.log('Server on port '+port)
}
main()