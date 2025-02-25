import express from 'express';
import { manager } from "../managers/product-manager.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await manager.getAllProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
});

export default router;