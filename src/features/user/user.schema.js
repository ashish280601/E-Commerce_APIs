import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:{
        type: String,
        // maxLength: [25, "Name can't be greater than 25 characters"]
    },
    email: {
        type: String,
        required: true,
        unqiue: true,
        // match: [/.+\@.+\../, "Please enter valid email"]
    },
    password:{
        type: String,
        // validate:{
        //     validator: function(value){
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);    
        //     },
        //     message:"Password should be between 8-12 characters and have a special character"
        // }
    },
    type:{
        type: String,
        enum: ['Customer', 'Seller', 'Currier']
    }
})