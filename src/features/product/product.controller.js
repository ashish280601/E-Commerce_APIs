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
