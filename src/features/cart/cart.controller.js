import CartItemModel from "./cart.model.js";

export default class CartController {
    getCart(req, res){
        const userID = req.userID;
        const cartItems = CartItemModel.getAllCartItem(userID);
        console.log(cartItems);
        if(!cartItems){
            return res.status(400).send(cartItems)
        }
        return res.status(200).send(cartItems);
    }

    addCart(req, res){
        const { productID, quantity} = req.query;
        const userID = req.userID;

        const cartItem = CartItemModel.addCart(userID, productID, quantity);
        console.log(cartItem);
        if(!cartItem){
            return res.status(401).json('Data is undefined')
        }
        return res.status(201).send('Cart is Updated');  
    }
}
