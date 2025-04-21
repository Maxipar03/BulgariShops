import { userService } from "../services/user-service.js";

class UserController {
    constructor(service) {
        this.service = service;
    }

    //Controlador para obtener todos los usuarios
    getAll = async (req, res, next) => {
        try {
            const response = await this.service.getAll();
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    //Controlador para obtener usuarios por ID
    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await this.service.getById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    //Controlador para crear usuarios
    create = async (req, res, next) => {
        try {
            const newUser = await this.service.create(req.body);
            res.json(newUser);
        } catch (error) {
            next(error);
        }
    };

    //Controlador para actualizar usuarios
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const userUpd = await this.service.update(id, req.body);
            res.status(200).json(userUpd);
        } catch (error) {
            next(error);
        }
    };

    //Controlador para eliminar usuarios
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const userDel = await this.service.delete(id);
            res.status(200).json(userDel);
        } catch (error) {
            next(error);
        }
    };
}

export const userController = new UserController(userService);