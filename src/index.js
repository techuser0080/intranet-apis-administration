import express from 'express'

const port = 4000
const app = express()

app.use(express.json())
app.use('/api/user')

const main = () => {
    app.listen(port)
    console.log('Server on port '+port)
}
main()