// import { userDao } from "../daos/filesystem/user-dao.js";
import { userDao } from "../daos/mongodb/user-dao.js"
import CustomError from "../utils/custom-error.js";

class UserService {
    constructor(dao) {
        this.dao = dao;
    }

    // Servicio para obtener usuarios
    getAll = async () => {
        try {
            return await this.dao.getAll();
        } catch (error) {
            throw new Error(error);
        }
    }

    // Servicio para obtener usuario por ID
    getById = async (id) => {
        try {
            const user = await this.dao.getById(id);
            if (!user) throw new CustomError('User not found', 404);
            return user;
        } catch (error) {
            throw (error);
        }
    }

    // Servicio para crear usuario
    create = async (user) => {
        try {
            const newUser = await this.dao.create(user);
            if (!newUser) throw new CustomError('Error creating user', 400);
            return newUser;
        } catch (error) {
            throw (error);
        }
    }

    // Servicio para actualizar usuario
    update = async (id, obj) => {
        try {
            const userUpd = await this.dao.update(id, obj);
            if (!userUpd) throw new CustomError('Error updating user', 400);
            return userUpd;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Servicio para eliminar usuario
    delete = async (id) => {
        try {
            const userDel = await this.dao.delete(id);
            if (!userDel) throw new CustomError('Error deleting user', 400);
            return userDel;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const userService = new UserService(userDao);