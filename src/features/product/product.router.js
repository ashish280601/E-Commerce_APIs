// 1. Import Express
import express from 'express';
import ProductController from './product.controller.js'; 

// 2. Initialize Express router.
const productRouter = express.Router();

// creating an instance to get an access of product controller methods
const productController = new ProductController();

// All the paths to controller methods
productRouter.get('/getProducts', productController.getAllProduct);  
productRouter.post('/addProduct', productController.addProduct);
productRouter.get('/filterProduct', productController.filterProduct);
productRouter.get('/:id',productController.getOneProduct); 

export default productRouter

  