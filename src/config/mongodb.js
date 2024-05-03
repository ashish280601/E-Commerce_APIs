// Connecting are express server with mongoDB database server

// 1. Import Mongodb class mongoClient
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); 

let client 
// 3. function to connect mongodb 
const connectToMongoDB = () => {
    MongoClient.connect(process.env.URL)
        .then(clientInstance => {
            client = clientInstance
            console.log("MongoDB is connected");
            createCounter(client.db("e-CommerceDB"));
        })
        .catch(err => {
            console.log(err);
        })
}

export const getDB = () => {
    return client.db("e-CommerceDB");
} 
const createCounter = async(db) => {
    // 1. check wheather the existing counter is present or not
    const exisitingCounter = await db.collection("counters").findOne({ _id: "cartItemID"});
    if(!exisitingCounter){
        await db.collection("counters").insertOne({ _id: "cartItemID", value: 0});
    }
}

export default connectToMongoDB;