import { Router } from "express";
import { cartController } from "../controllers/cart-controller.js";

const router = Router();

router.get("/:id", cartController.getCartById);
router.post("/", cartController.createCartEmpty);
router.put("/:id", cartController.addProductsCart);
router.put("/:id/products/:pid", cartController.modQuantity);
router.delete("/:id", cartController.deleteAllProdCart);
router.delete("/:id/products/:pid", cartController.deleteProdCart);

export default router;