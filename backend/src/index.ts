import express from 'express'

const app = express()
const port = '0.0.0.0'

app.use(express.json())

app.get('/', () => 'Hello World!')

app.listen(port, () => console.log("API STARTS ON " + port))