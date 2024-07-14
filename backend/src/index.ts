import express from 'express'

const app = express()

const port = process.env.PORT || 4000;

app.use(express.json())

app.get('/', () => 'Hello World!')

app.listen(port, () => console.log("API STARTS ON " + port))