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
      return products

    } catch (error) {
      loggerMiddleware(error);
      throw new ApplicationErrors("Something went wrong with database", 500);
    }
  }

  async getOneProduct(id){
    try {
        // 1. Get a database
        const db = getDB();
        // 2. Creating a collection
        const productCollection = db.collection(this.collection);
        // 3. Getting a data by findinf Object Id.
        const singleProduct = await productCollection.findOne({_id: new ObjectId(id)});
        return singleProduct
    } catch (error) {
        console.log(error);
        throw new ApplicationErrors("Something went wrong with database", 500)
    }
  }
}

export default ProductRepository;
