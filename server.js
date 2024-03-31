// 1. Importing Express
import express from "express";

// 2. Creating an express server
const server = express();

// 3. Creating an port variable.
const port = 7000;

// checking the server is working or not proper
server.get('/', (req, res) => {
    res.send('Welcome To E-Commerce Trendio APIs')
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

