import express from 'express'
import folderRouter from './api/routes/folderRouter.js'
import audioRouter from './api/routes/audioRouter.js'

const port = 4000
const app = express()

app.use(express.json())
app.use('/api/folder', folderRouter)
app.use('/api/audio', audioRouter)

const main = () => {
    app.listen(port)
    console.log('Server on port '+port)
}
main()