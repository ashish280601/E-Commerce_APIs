// 1. Importing Express
import express from "express";
import router from "./routes.js";
import bodyParser from "body-parser";

// 2. Creating an express server
const server = express();

// using body parser so backend get the request body data middleware
server.use(bodyParser.json())

// setting up a parent routes files to all the router of an APIs.
server.use(router)


// 3. Creating an port variable.
const port = 7000;

// checking the server is working or not proper
server.get('/', (req, res) => {
    res.send('Welcome To E-Commerce Trendio APIs')
});

// 4 Listing an server in unique port number.
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

