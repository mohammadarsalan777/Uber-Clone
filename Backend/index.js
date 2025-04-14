import { app } from "./app.js";
import dotenv from 'dotenv'
dotenv.config()
import http from 'http'

const port = process.env.PORT || 8000


const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Port is listening at ${port}`);

})