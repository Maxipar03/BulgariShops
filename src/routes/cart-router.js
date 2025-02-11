import { Router } from "express";
import { manager } from "../managers/cart-manager.js";

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const cart = await manager.createCart();
        res.json(cart);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await manager.getCartById(id);
        res.json(cart);
    } catch (error) {
        next(error)
    }
});

router.post('/:cid/product/:pid', (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const cartUpdated = manager.addProductToCart(cid, pid);
        res.json(cartUpdated)
    } catch (error) {
        next(error)
    }
})

export default router;