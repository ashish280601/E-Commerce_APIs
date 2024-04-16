export default class CartItemModel {
  constructor(id, userID, productID, quantity) {
    (this.id = id),
      (this.userID = userID),
      (this.productID = productID),
      (this.quantity = quantity);
  }

  static addCart(userID, productID, quantity) {
    console.log(quantity);
    const cartItem = {
      userID,
      productID,
      quantity
    };
    cartItem.id = cartItems.length + 1;
    console.log(cartItem);
    cartItems.push(cartItem);
    return cartItem;
  }

  static getAllCartItem(userID) {
    return cartItems.filter((i) => i.userID == userID);
  }
}

let cartItems = [new CartItemModel(1, 2, 3, 5), new CartItemModel(2, 1, 1, 3)];
