// 1. Import Express
import express from "express";
import ProductController from "./product.controller.js";
import uploads from "../../middlewares/fileUpload.js";

// 2. Initialize Express router.
const productRouter = express.Router();

// creating an instance to get an access of product controller methods
const productController = new ProductController();

// All the paths to controller methods
productRouter.get("/getProducts", (req, res) => {
  productController.getAllProduct(req, res);
});
productRouter.post("/getProducts/rateProduct", (req, res) => {
    productController.rateProduct(req, res);
});
productRouter.post("/addProduct", uploads.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});

productRouter.get("/getProducts/filter", (req, res) => {
  productController.filterProduct(req, res);
});

productRouter.get("/getProducts/avgPrice", (req, res) => {
  productController.averagePrice(req, res);
})

productRouter.get("/getProducts/:id", (req, res) => {
  productController.getSingleProduct(req, res);
});

export default productRouter;
