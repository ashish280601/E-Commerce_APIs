import ProductModel from "./product.model.js";
// 1. Create a product class controller
export default class ProductController {
  // 2. Define all the method/function
  getAllProduct(req, res) {
    // write your code logic here
    const products = ProductModel.getAll();
    return res.status(200).send(products);
  }

  addProduct(req, res) {
    // write your code logic here
    console.log(req.body);

    // destructing my req body
    const { name, desc, price, category, size } = req.body;
    // creating an instance for the product model
    const newProduct = {
      name,
      desc,
      imageUrl: req.file.filename,
      price: parseInt(price),
      category,
      size: size.split(","),
    }; 

    const createdProduct = ProductModel.add(newProduct);
    return res.status(201).send(createdProduct);
  }

  rateProduct(req, res) {
    // write your code logic here
  }

  filterProduct(req, res) {
    // write your code logic here
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const category = req.query.category;

    //   if (isNaN(minPrice) || isNaN(maxPrice) || !category) {
    //     return res.status(400).send("Invalid parameters");
    // }
    const filterResult = ProductModel.filterProduct(
      minPrice,
      maxPrice,
      category
    );
    console.log(filterResult);
    return res.status(200).send(filterResult);
  }

  getSingleProduct(req, res) {
    // write your code logic here
    const id = req.params.id;
    const singleProduct = ProductModel.getOneProduct(id);
    if (!singleProduct) {
      return res.status(404).send("Product not found");
    } else {
      return res.status(200).json(singleProduct);
    }
  }
}
