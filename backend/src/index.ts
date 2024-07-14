import express from 'express'

const app = express()

const port = Number(process.env.PORT) || 10000

app.use(express.json())

app.get('/', () => 'Hello World!')

app.listen(port, '0.0.0.0', () => console.log("API STARTS ON " + port))