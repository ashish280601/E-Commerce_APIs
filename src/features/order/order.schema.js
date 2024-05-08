import { Schema } from "mongoose";

export const orderSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    totalAmount: {
        type: Number    
    },
    timeStamp: {
        type: new Date()
    }
})