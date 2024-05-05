import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class OrderRepository{
    constructor(){
        this.collection = "orders";
    }

    async placeOrder( userId ){
        // write your code logic here.
        
        // 1. Get cartItem and calculate totoal amount.
        await this.getTotalAmount(userId)

        // 2. Create an order record.

        // 3. Reduce the stock 

        // 4. Clear the cart items.
    }

    async getTotalAmount(userId){
        const db = getDB();

        const totalAmount = await db.collection("cart").aggregate([
            // Step 1. Match the userID to find the total cart product of that users
            {
                $match: { userID: new ObjectId(userId)}
            },
            // Step 2. Get the user product details from product collection.
            {
                $lookup:{
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            // Step 3. Descontructing the nested object array into an document fields
            {

                $unwind: "$productInfo"
            },
            // Step 4. Calculate the productItem and quantity
            {
                $addFields:{
                    "totalAmount": {
                        $multiply: ["$productInfo.price", "$quantity"]
                    }
                }
            }

        ]).toArray();
        const finalTotalAmount = totalAmount.reduce((amount, productItem) => amount + productItem.totalAmount, 0)
        console.log("finalTotalAmount", finalTotalAmount);    
    }
}