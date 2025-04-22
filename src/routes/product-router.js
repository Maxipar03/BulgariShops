import { Router } from "express";
import { productController } from "../controllers/product-controller.js";

const router = Router();

router.get("/", productController.getAll); // Ruta para obtener todos los productos

router.get("/:id", productController.getById); // Ruta para obtener todos producto por ID

router.post("/", productController.create); // Ruta para crear productos

router.put("/:id", productController.update); // Ruta para actualizar producto

router.delete("/:id", productController.delete); // Ruta para eliminar producto



export default router;

