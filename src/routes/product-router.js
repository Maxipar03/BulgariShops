import { Router } from "express";
import { manager } from "../managers/product-manager.js";
import { paramsValidator } from "../middlewares/paramsValidator.js";

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const products = await manager.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', [paramsValidator], async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await manager.getProductsByid(id);
        return res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const product = await manager.createProduct({
            ...req.body
        });
        return res.status(201).json({ id: product.id, title: product.title, description: product.description, code: product.code, price: product.price, status: product.status, stock: product.stock, category: product.category });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', [paramsValidator], async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpd = await manager.updateProduct(id, req.body);
        return res.status(200).json(prodUpd);
    } catch (error) {
        next(error);
    }
});


router.delete('/:id', [paramsValidator], async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await manager.deleteProduct(id);
        return res
            .status(200)
            .json({ message: `Product delete ok - id: ${prodDel.id}` });
    } catch (error) {
        next(error);
    }
});


export default router;

