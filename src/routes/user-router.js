import { Router } from "express";
import { userController } from "../controllers/user-controller.js";

const router = Router();

router.get("/", userController.getAll); // Ruta para obtener todos los usuarios

router.get("/:id", userController.getById); // Ruta para obtener usuarios por ID

router.post("/", userController.create);  // Ruta para crear usuario

router.put("/:id", userController.update); // Ruta para actualizar usuario

router.delete("/:id", userController.delete); // Ruta para eliminar usuario



export default router;
