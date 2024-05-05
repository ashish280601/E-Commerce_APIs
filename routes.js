import express from "express";
import productRouter from "./src/features/product/product.router.js";
import userRouter from "./src/features/user/user.router.js";
import basicAuthorizer from "./src/middlewares/basicAuth.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cart/cart.routes.js";
import orderRouter from "./src/features/order/order.router.js";

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'E-Commerce APIs',
    })
})

router.use('/api/users', userRouter);
// using json token authorization.
router.use('/api/products', jwtAuth, productRouter);
router.use('/api/cartItems', jwtAuth, cartRouter);
router.use('/api/orders', jwtAuth, orderRouter);

// Middleware to handle not found routes
router.use((req, res) => {
    res.status(404).send("API's not found");
})

// using basic auth
// router.use('/api/products', basicAuthorizer, productRouter);

export default router