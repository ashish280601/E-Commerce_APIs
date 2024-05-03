import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../../config/mongodb.js";
export default class CartRepository {
  constructor() {
    this.collection = "cart";
  }

  async getCart(userID) {
    try {
      // write your code logic here
      const db = getDB();
      const cartCollection = db.collection(this.collection);
      return await cartCollection
        .find({ userID: new ObjectId(userID) })
        .toArray();
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }

  async addCart(userID, productID, quantity) {
    try {
      // write your code logic here
      const db = getDB();

      const cartCollection = db.collection(this.collection);
      const id = await this.getNextCounter(db)
      // find the document
      // either insert or update
      // Insertion.
      return await cartCollection.updateOne(
        {
          userID: new ObjectId(userID),
          productID: new ObjectId(productID),
        },
        {
          $setOnInsert: { _id: id},
          $inc: { quantity: quantity },
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }

  async delCart(userID, cartItemID) {
    // write your code logic here
    try {
      const db = getDB();

      const cartCollection = db.collection(this.collection);

      const result = await cartCollection.deleteOne({
        userID: new ObjectId(userID),
        _id: new ObjectId(cartItemID),
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }

  async getNextCounter(db){
    // write your code logic here.
    const resultCounter = await db.collection("counters").findOneAndUpdate(
      {
        _id: "cartItemID"
      },
      {
        $inc: {value: 1}
      },
      {
        returnDocument: 'after'
      }
    );
    console.log(resultCounter);
    return resultCounter.value
  }
}
