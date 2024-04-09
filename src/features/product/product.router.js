// 1. Import Express
import express from 'express';
import ProductController from './product.controller.js'; 
import uploads from '../../middlewares/fileUpload.js';

// 2. Initialize Express router.
const productRouter = express.Router();

// creating an instance to get an access of product controller methods
const productController = new ProductController();

// All the paths to controller methods
productRouter.get('/getProducts', productController.getAllProduct);  
productRouter.post('/addProduct', uploads.single('imageUrl'), productController.addProduct);
productRouter.get('/getProducts/filter', productController.filterProduct);
productRouter.get('/getProducts/:id',productController.getSingleProduct); 

export default productRouter

  