// import { productDao } from "../daos/filesystem/product-dao.js";
import { productDao } from "../daos/mongodb/product-dao.js";
import CustomError from "../utils/custom-error.js";

class ProductService {
    constructor(dao) {
        this.dao = dao;
    }

    // Servicio para obtener todos los productos
    getAll = async (page, limit, name, sort) => {
        try {
            return await this.dao.getAllProducts(page, limit, name, sort);
        } catch (error) {
            throw new Error(error);
        }
    }

    // Servicio para obtener producto por ID
    getById = async (id) => {
        try {
            const product = await this.dao.getById(id);
            if (!product) throw new CustomError('Product not found', 404);
            return product;
        } catch (error) {
            throw (error);
        }
    }

    // Servicio para crear producto
    create = async (product) => {
        try {
            const newProd = await this.dao.create(product);
            if (!newProd) throw new CustomError('Error creating product', 400);
            return newProd;
        } catch (error) {
            throw (error);
        }
    }

    // Servicio para actualizar producto
    update = async (id, obj) => {
        try {
            const prodUpd = await this.dao.update(id, obj);
            if (!prodUpd) throw new CustomError('Error updating product', 400);
            return prodUpd;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Servicio para eliminar producto
    delete = async (id) => {
        try {
            const prodDel = await this.dao.delete(id);
            if (!prodDel) throw new CustomError('Error deleting product', 400);
            return prodDel;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const productService = new ProductService(productDao);