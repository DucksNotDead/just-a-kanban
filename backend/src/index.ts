import express from 'express'

const app = express()

app.use(express.json())

app.get('/', () => 'Hello World!')

app.listen(() => console.log("API STARTS"))