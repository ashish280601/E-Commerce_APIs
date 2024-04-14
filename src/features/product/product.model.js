import UserModel from "../user/user.model.js";

export default class ProductModel {
  // creating a hardcoded database filed.
  constructor(id, name, desc, imageUrl, price, category, size) {
    (this.id = id),
      (this.name = name),
      (this.desc = desc),
      (this.imageUrl = imageUrl),
      (this.price = price),
      (this.category = category),
      (this.size = size);
  }

  static getAll() {
    return products;
  }

  static getOneProduct(id) {
    const product = products.find((i) => i.id == id);
    return product;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static filterProduct(minPrice, maxPirce, category) {
    const result = products.filter((product) => {
      return (
        product.price >= minPrice &&
        product.price <= maxPirce &&
        product.category === category
      );
    });
  }

  static rateProduct(userID, productID, rating){
    // 1. Validate User and Product
    const user = UserModel.getAllUser().find( u => u.id == userID);
    console.log(user);
    if(!user){
      return 'User not found';
    }
    // check product
    const product = products.find( p => p.id == productID);
    if(!product){
      return 'Product not found';
    }

    // 2. Check if there are any ratings if not then add ratings array.
    if(!product.ratings){
      product.ratings = [];
      product.ratings.push({
        userID,
        rating
      })
    }else{
      // 3. check if the user rating is already available then update.
      const existingRatingIndex = product.ratings.findIndex(
        rating => rating.userID === userID
      )

      if(existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = {
          userID,
          rating
        }
      }else{
        //4. if no existing rating, then add new rating.
        product.ratings.push({
          userID,
          rating
        })
      }
    }
  }
}

// creating an product database
var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for product 1",
    "http://m.meida-amazon.com",
    19.99,
    "Category 1",
    ["M", "XL"]
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for product 2",
    "http://m.meida-amazon.com",
    500,
    "Category 2",
    ["M", "XM", "L", "S"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for product 3",
    "http://m.meida-amazon.com",
    1000,
    "Category 3",
    ["M", "XL", "S"]
  ),
  new ProductModel(
    4,
    "Product 4",
    "Description for product 4",
    "http://m.meida-amazon.com",
    1500,
    "Category 4",
    ["M", "L", "S"]
  ),
];
