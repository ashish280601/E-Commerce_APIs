import express from "express";
import CartController from "./cart.controller.js";

const cartRouter = express.Router();

const cartController = new CartController();

cartRouter.get('/getCart', cartController.getCart);
cartRouter.post('/addCart', cartController.addCart);

export default cartRouter;