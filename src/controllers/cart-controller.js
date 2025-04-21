import { cartService } from "../services/cart-service.js";

class CartController {
    constructor(service) {
        this.service = service;
    }

    // Controlador crear carrito vacio 
    createCartEmpty = async (req, res, next) => {
        try {
            const newCar = await this.service.createCartEmpty();
            res.json(newCar);

        } catch (error) {
            next(error);
        }
    };

    // Controlador agregar productos al carrito
    addProductsCart = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { products } = req.body;
            const response = await this.service.addProductsCart(id, products);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    // Controlador modificar cantidad de productos del carrito
    modQuantity = async (req, res, next) => {
        try {
            const { id, pid } = req.params;
            const { quantity } = req.body;

            const response = await this.service.modQuantity(id, pid, quantity);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    // Controlador eliminar producto del carrito
    deleteProdCart = async (req, res, next) => {
        try {
            const { id, pid } = req.params;
            const { quantity } = req.body;

            const response = await this.service.deleteProdCart(id, pid, quantity);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    
    // Controlador eliminar todos los productos del carrito
    deleteAllProdCart = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.service.deleteAllProdCart(id);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    // Controlador obtiene carrito por id
    getCartById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.service.getCartById(id);
            res.status(200).json(response);

        } catch (error) {
            next(error);
        }
    };

}

export const cartController = new CartController(cartService);