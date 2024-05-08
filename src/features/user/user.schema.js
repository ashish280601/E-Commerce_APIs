import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email: {
        type: String,
        unqiue: true
    },
    pasword:{
        type: String
    },
    type:{
        type: String,
        enum: ['Customer', 'Seller', 'Currier']
    }
})