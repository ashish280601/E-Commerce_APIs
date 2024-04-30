import CartItemModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";

export default class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
  }
  async getCart(req, res) {
    try {
      const userID = req.userID;
      const cartItems = await this.cartRepository.getCart(userID);
      console.log(cartItems);
      return res.status(200).send(cartItems);
    } catch (error) {
      return res.status(400).send("Something went wrong");
    }
  }

  async addCart(req, res) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userID;

      const cartItem = await this.cartRepository.addCart(
        userID,
        productID,
        quantity
      );
      console.log("cartItem", cartItem);
      return res.status(201).send("Cart is Updated");
    } catch (error) {
      console.log(error);
      return res.status(401).json("Data is undefined");
    }
  }

  async delCart(req, res) {
    try {
      // wriite your code logic here
      const userID = req.userID;
      const cartItemID = req.params.id;
      await this.cartRepository.delCart(userID, cartItemID);
      return res.status(200).send("Cart Item is removed");
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something went wrongs");
    }
  }
}
