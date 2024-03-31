import express from "express";
import productRouter from "./src/features/product/product.router.js";

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'E-Commerce APIs',
    })
})

router.use('/api/products', productRouter)

export default router