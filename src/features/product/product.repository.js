import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationErrors } from "../../error-handler/applicationError.js";
import loggerMiddleware from "../../middlewares/logger.middleware.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(newProduct) {
    try {
      // 1. Get a database
      const db = getDB();
      // 2. Creating a collection
      const productCollection = db.collection(this.collection);
      // 3. Insert a product data.
      await productCollection.insertOne(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new ApplicationErrors("Something wrong with database", 500);
    }
  }

  async getAll() {
    try {
      // 1. Get a database
      const db = getDB();
      // 2. Creating a collection
      const productCollection = db.collection(this.collection);
      // 3. Getting all the produc data from database product collection.
      const products = await productCollection.find().toArray();
      return products;
    } catch (error) {
      loggerMiddleware(error);
      throw new ApplicationErrors("Something went wrong with database", 500);
    }
  }

  async getOneProduct(id) {
    try {
      // 1. Get a database
      const db = getDB();
      // 2. Creating a collection
      const productCollection = db.collection(this.collection);
      // 3. Getting a data by findinf Object Id.
      const singleProduct = await productCollection.findOne({
        _id: new ObjectId(id),
      });
      return singleProduct;
    } catch (error) {
      console.log(error);
      throw new ApplicationErrors("Something went wrong with database", 500);
    }
  }

  async filterProducts(minPrice, maxPrice, category) {
    try {
      const db = getDB();

      const productCollection = db.collection(this.collection);

      const filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      // projection operators.
      return await productCollection
        .find(filterExpression)
        .project({ name: 1, price: 1, _id: 0, ratings: { $slice: 1 } })
        .toArray();
    } catch (error) {
      console.log(error);
      loggerMiddleware(error);
      throw new ApplicationErrors("Something went wrong with database", 500);
    }
  }

  // Method 1 To update the rating of an user

  // async rateProduct(userID, productID, rating) {
  //   try {
  //     const db = getDB();

  //     const productCollection = db.collection(this.collection);
  //     // 1. Find the products
  //     const product = await productCollection.findOne( { _id: new ObjectId(productID)});
  //     // 2. Find the rating
  //     const userRating = product?.ratings?.find( r => r.userID == userID);
  //     if(userRating){
  //       // 3. If the user rate is there then update the rating.
  //       await productCollection.updateOne({
  //         _id: new ObjectId(productID), "ratings.userID": new ObjectId(userID)
  //       },{
  //         $set:{
  //           "ratings.$.rating": rating
  //         }
  //       })
  //     }else{
  //       await productCollection.updateOne(
  //         {
  //           _id: new ObjectId(productID),
  //         },
  //         {
  //           $push: { ratings: { userID: new ObjectId(userID), rating } },
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApplicationErrors("Something went wrongs with database", 500);
  //   }
  // }

  // Method 2

  async rateProduct(userID, productID, rating) {
    try {
      const db = getDB();

      const productCollection = db.collection(this.collection);
      // 1. Remove existing extry
      await productCollection.updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          $pull: { ratings: { userID: new ObjectId(userID) } },
        }
      );
      // 2. Add new entry
      await productCollection.updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          $push: { ratings: { userID: new ObjectId(userID), rating } },
        }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationErrors("Something went wrongs with database", 500);
    }
  }

  // ################# Aggregation Pipeline Concept ####################

  // Calculating an average price of an product per category using aggreagation pipleline.\
  async avgProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          // Grouping an document based on the product cateogry
          {
            $group: {
              _id: "$category",
              price: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrong with database");
    }
  }

  async averageRating() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          // 1. Deconstructing my nested array into an per document rating field.
          {
            $unwind: "$ratings",
          },
          // 2. Grouping my ratings and calculating an average rating.
          {
            $group: {
              _id: "$name",
              avgRate: { $avg: "$ratings.rating" },
            },
          },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrong with database");
    }
  }

  async countRatingPerProduct() {
    try {
      const db = getDB();

      const countRating = await db.collection(this.collection).aggregate([
        // limit the size of an filed per document usingt projection
        {
          $project: {
            name: 1,
            countOfRating: {
              $cond: {
                if: { $isArray: "$ratings"},
                then: { $size: "$ratings" },
                else: 0,
              },
            },
          },
        },
        // sorting the collection
        {
          $sort: { countRatingPerProduct: -1}
        },
        // limiting the result to shown only 1 item 
        {
          $limit: 1
        }
      ]).toArray();
      return countRating;
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrong with database");
    }
  }
}

export default ProductRepository;
