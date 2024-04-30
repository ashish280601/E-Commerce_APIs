import express from "express";
import CartController from "./cart.controller.js";

const cartRouter = express.Router();

const cartController = new CartController();

cartRouter.get('/getCart', (req, res) => {
    cartController.getCart(req, res)
});

cartRouter.post('/addCart',  (req, res) => {
    cartController.addCart(req, res)
});

cartRouter.delete('/:id',  (req, res) => {
    cartController.delCart(req, res)
});

export default cartRouter;