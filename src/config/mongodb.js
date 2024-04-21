// Connecting are express server with mongoDB database server

// 1. Import Mongodb class mongoClient
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); 

// 2. storing an url of an mongodb
const url = process.env.URL

let client 
// 3. function to connect mongodb 
const connectToMongoDB = () => {
    MongoClient.connect(url)
        .then(clientInstance => {
            client = clientInstance
            console.log("MongoDB is connected");
        })
        .catch(err => {
            console.log(err);
        })
}

export const getDB = () => {
    return client.db("e-CommerceDB");
}

export default connectToMongoDB;