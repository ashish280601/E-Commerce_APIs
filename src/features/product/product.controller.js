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

  async filterProduct(req, res) {
    // write your code logic here
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;

      const filterResult = await this.productRepository.filterProducts(
        minPrice,
        maxPrice,
        category
      );
      return res.status(200).send(filterResult);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrongs");
    }
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

  async rateProduct(req, res) {
    try {
      console.log(req.body);
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;
      await this.productRepository.rateProduct(
        userID,
        productID,
        rating
      );
      return res.status(200).send("Rating Successful Added");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }

  async averagePrice(req, res){
    try {
      const result = await this.productRepository.avgProductPricePerCategory();
      console.log("result", result);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrong while calculating average price");
    }
  }

  async averageRate(req, res){
    try {
      const resultRating = await this.productRepository.averageRating();
      console.log("resultRating", resultRating);
      return res.status(200).send(resultRating);
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrong while calculating average rating");
    }
  }

  async countRatingPerProduct(req, res){
    try {
      const countRatingResult = await this.productRepository.countRatingPerProduct();
      console.log("countRatingResult", countRatingResult);
      return res.status(200).send(countRatingResult);
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrongs");
    }
  }
}
