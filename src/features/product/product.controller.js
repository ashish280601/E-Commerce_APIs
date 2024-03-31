import ProductModel from "./product.model.js";
// 1. Create a product class controller
export default class ProductController{

    // 2. Define all the method/function
    getAllProduct(req, res){
        // write your code logic here
        const products = ProductModel.getAll();
        return res.status(200).send(products);

    }

    addProduct(req, res){
        // write your code logic here
    }
    
    rateProduct(req, res){
        // write your code logic here
    }

    filterProduct(req, res) {
        // write your code logic here
    }
    getOneProduct(req, res){
        // write your code logic here
    }z
    
}