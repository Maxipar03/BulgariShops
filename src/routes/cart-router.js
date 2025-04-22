import { Router } from "express";
import { cartController } from "../controllers/cart-controller.js";

const router = Router();

router.get("/:id", cartController.getCartById); // Ruta para obtener carrito por ID

router.post("/", cartController.createCartEmpty); // Ruta para crear carrito vacio []

router.put("/:id", cartController.addProductsCart); // Ruta para añadir producto al carrito 

router.put("/:id/products/:pid", cartController.modQuantity); // Ruta para modificar cantidad de productos

router.delete("/:id", cartController.deleteAllProdCart); // Ruta para eliminar carrito

router.delete("/:id/products/:pid", cartController.deleteProdCart); // Ruta para eliminar producto de carrito

export default router;