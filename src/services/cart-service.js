// import { productDao } from "../daos/filesystem/product-dao.js";
import { cartDao } from "../daos/mongodb/cart-dao.js";
import CustomError from "../utils/custom-error.js";

class CartService {
    constructor(dao) {
        this.dao = dao;
    }

    // Servicio para añadir productos al carrito
    addProductsCart = async(id, products) => {
        try{
            const cart = await this.dao.addProductsCart(id, products)
            return cart
        }catch(error) {
            throw new Error(error);
        }
    }

    // Servicio para modificar cantidad de producto dentro del carrito
    modQuantity = async(id, pid, quantity) => {
        try{
            const cart = await this.dao.modQuantity(id, pid, quantity)
            return cart
        } catch(error) {
            throw new Error(error);
        }
    } 

    // Servicio para eliminar producto del carrito
    deleteProdCart = async(id, pid, quantity) => {
        try{
            const cart = await this.dao.deleteProdCart(id, pid, quantity)
            return cart
        } catch(error) {
            throw new Error(error);
        }
    } 

    // Servicio para eliminar carrito
    deleteAllProdCart = async(id) => {
        try{
            const cart = await this.dao.deleteAllProdCart(id)
            return cart
        }catch(error) {
            throw new Error(error);
        }
    }

    // Servicio para crear carrito vacio []
    createCartEmpty= async() => {
        try{
            return await this.dao.createCartEmpty();
        } catch(error) {
            throw new Error(error);
        }
    } 

    // Servicio para obtener carrito por ID
    getCartById = async(id) => {
        try{
            const cart = await this.dao.getCartById(id)
            console.log(cart)
            if(!cart)  throw new CustomError('Cart not found', 404);
            return cart
        } catch(error) {
            throw new Error(error);
        }
    } 

}

export const cartService = new CartService(cartDao);