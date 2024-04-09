import express from "express";
import productRouter from "./src/features/product/product.router.js";
import userRouter from "./src/features/user/user.router.js";
import basicAuthorizer from "./src/middlewares/basicAuth.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

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

// using basic auth
// router.use('/api/products', basicAuthorizer, productRouter);

export default router