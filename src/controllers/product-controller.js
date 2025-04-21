import { productService } from "../services/product-service.js";

class ProductController {
    constructor(service) {
        this.service = service;
    }

    //Controlador para obtener todos los productos
    getAll = async (req, res, next) => {
        try {
            const { page, limit, name, sort } = req.query;

            const response = await this.service.getAll(page, limit, name, sort);

            const next = response.hasNextPage
                ? `http://localhost:8080/users/all?page=${response.nextPage}`
                : null;
            const prev = response.hasPrevPage
                ? `http://localhost:8080/users/all?page=${response.prevPage}`
                : null;

            res.json({
                results: response.docs,
                info: {
                    status: response.status,
                    count: response.totalDocs,
                    pages: response.totalPages,
                    next,
                    prev,
                },
            });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    //Controlador para obtener productos por ID
    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.service.getById(id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };

    //Controlador para crear productos
    create = async (req, res, next) => {
        try {
            const newProd = await this.service.create(req.body);
            res.json(newProd);
        } catch (error) {
            next(error);
        }
    };

    //Controlador para actualizar productos
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const productUpd = await this.service.update(id, req.body);
            res.status(200).json(productUpd);
        } catch (error) {
            next(error);
        }
    };

    //Controlador para eliminar productos
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const productDel = await this.service.delete(id);
            res.status(200).json(productDel);
        } catch (error) {
            next(error);
        }
    };
}

export const productController = new ProductController(productService);