import * as http from "node:http";

const server = http.createServer()

const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log('working on ' + port);
})