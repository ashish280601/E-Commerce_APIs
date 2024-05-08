import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    // write your code logic here.
    const client = getClient(); 
    const session = client.startSession();
    try {
      const db = getDB();
      session.startTransaction();
      // 1. Get cartItem and calculate totoal amount.
      const items = await this.getTotalAmount(userId, session);
      const finalTotalAmount = items.reduce(
        (amount, productItem) => amount + productItem.totalAmount,
        0
      );
      console.log("finalTotalAmount", finalTotalAmount);

      // 2. Create an order record.
      const newOrders = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );
      await db.collection(this.collection).insertOne(newOrders, { session });

      // 3. Reduce the stock
      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productID },
            { $inc: { stock: -item.quantity } },
            { session }
          );
      }
      // throw new Error("Something went wrong in place orders");

      // 4. Clear the cart items.
      await db.collection("cart").deleteMany(
        {
          userID: new ObjectId(userId),
        },
        { session }
      );
      session.commitTransaction();
      session.endSession();
      return;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log(error);
      throw new Error("Something went wrongs with database");
    }
  }

  async getTotalAmount(userId, session) {
    const db = getDB();

    const items = await db
      .collection("cart")
      .aggregate(
        [
          // Step 1. Match the userID to find the total cart product of that users
          {
            $match: { userID: new ObjectId(userId) },
          },
          // Step 2. Get the user product details from product collection.
          {
            $lookup: {
              from: "products",
              localField: "productID",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          // Step 3. Descontructing the nested object array into an document fields
          {
            $unwind: "$productInfo",
          },
          // Step 4. Calculate the productItem and quantity
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();
    return items;
  }
}
