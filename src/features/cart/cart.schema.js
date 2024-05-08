// Schema is an blueprint.
import { Schema } from "mongoose";

export const cartSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    productID:{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: {
        type: Number
    }
});
