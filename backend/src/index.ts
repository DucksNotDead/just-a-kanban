import express from 'express'

const app = express()
const port = 8080

app.use(express.json())

app.get('/', () => 'Hello World!')

app.listen(port, () => console.log("API STARTS ON " + port))