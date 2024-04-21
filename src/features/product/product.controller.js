import loggerMiddleware from "../../middlewares/logger.middleware.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

// 1. Create a product class controller
export default class ProductController {
  //2. Creating an repository instance
  constructor() {
    this.productRepository = new ProductRepository();
  }

  // 3. Define all the method/function
  async getAllProduct(req, res) {
    // write your code logic here
    try {
      const products = await this.productRepository.getAll();
      return res.status(200).send(products);
    } catch (error) {
      console.log(error);
      // loggerMiddleware(error);
      return res.status(500).send("Something went wrong");
    }
  }

  async addProduct(req, res) {
    // write your code logic here
    try {
      console.log(req.body);

      // destructing my req body
      const { name, desc, price, category, size } = req.body;
      const createdProduct = new ProductModel(
        name,
        desc,
        req.file.filename,
        parseFloat(price),
        category,
        size.split(",")
      );
      await this.productRepository.add(createdProduct);
      return res.status(201).send(createdProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something Went Wrong");
    }
  }

  filterProduct(req, res) {
    // write your code logic here
    const minPrice = req.query.minPrice;
    const maxPirce = req.query.maxPirce;
    const category = req.query.category;

    const filterResult = ProductModel.filterProduct(
      minPrice,
      maxPirce,
      category
    );
    return res.status(200).send(filterResult);
  }

  async getSingleProduct(req, res) {
    // write your code logic here
    try {
      const id = req.params.id;
      // const singleProduct = ProductModel(id);
      const singleProduct = await this.productRepository.getOneProduct(id);
      if (!singleProduct) {
        return res.status(400).send("Product not found");
      } else {
        return res.status(200).json(singleProduct);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrongs");
    }
  }

  rateProduct(req, res) {
    console.log(req.query);
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;

    try {
      ProductModel.rateProduct(userID, productID, rating);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
    return res.status(200).send("Rating Successful Added");
  }
}
