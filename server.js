// 1. Importing Express
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import connectToMongoDB from "./src/config/mongodb.js";

// 2. Creating an express server
dotenv.config();
const server = express();


//Method 1: Using Manually CORS policy configuration using Headers 
// server.use((req, res, next) => {
//     // * defined that all type are allowed
//     res.header('Access-Control-Allow-Origin', 'put-client-url-link');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     // return ok for preflight request
//     if(req.method == 'OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();
// });

// CORS using 3 party library

// giving access to the client side url
var corsOptions = {
    origin: 'http://localhost:5176',
    allowedHeaders: '*'
}

server.use(cors(corsOptions));

server.use(morgan('dev'));



// using body parser so backend get the request body data middleware
server.use(bodyParser.json())

server.use(loggerMiddleware)


// setting up a parent routes files to all the router of an APIs.
server.use(router)


// 3. Creating an port variable.
const port = 7000;

// checking the server is working or not proper
server.get('/', (req, res) => {
    res.send('Welcome To E-Commerce Trendio APIs')
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(503).send('Something went wrong.Please try again later');
})

// 4 Listing an server in unique port number.
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    connectToMongoDB();
});

