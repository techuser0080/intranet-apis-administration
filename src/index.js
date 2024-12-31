import express from 'express'
import jwt from 'jsonwebtoken'
import folderRouter from './api/routes/folderRouter.js'
import audioRouter from './api/routes/audioRouter.js'
import { Constants } from './config/constants.js'
import cookieParser from 'cookie-parser'

const port = 4000
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    const token = req.cookies.acces_token
    req.session = { user: null }

    try {
        const data = jwt.verify(token, Constants.JWT_SECRET_SIGNATURE_NAME)
        req.session.user = data
    } catch (error) {
        console.log(error)
    }
    next()
})

app.use('/api/folder', folderRouter)
app.use('/api/audio', audioRouter)

const main = () => {
    app.listen(port)
    console.log('Server on port '+port)
}
main()