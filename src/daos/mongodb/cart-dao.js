import { CartModel } from "./models/cart-model.js";
import CustomError from "../../utils/custom-error.js";
import MongoDao from "./mongo-dao.js";

class CartDaoMongo extends MongoDao {
    constructor(model) {
        super(model);
    }
    
    createCartEmpty = async() => {
        try{
            return await this.model.create({ product: [] });
        }catch(error){
            throw new Error(error);
        }
    };

    addProductsCart = async(id, products) => {
        try{
            const cart = await this.model.findById(id);
            if(!cart)  throw new CustomError('Cart not found', 404);
            cart.products = products;
            await cart.save();
        }catch(error){
            throw new Error(error);
        }
    };

    modQuantity = async(id, pid, quantity) => {
        try{
            const cart = await this.model.findById(id);
            if(!cart) throw new CustomError('Cart not found', 404);

            const productInCart = cart.products.find(p => p.product._id.equals(pid));
            if (!productInCart) return res.status(404).json({ message: "Product not in cart" });

            productInCart.quantity  = quantity;
            await cart.save();
        }catch(error){
            throw new Error(error);
        }
    }

    deleteProdCart = async(id, pid, quantity) => {
        try{
            const cart = await this.model.findById(id);
            if(!cart) throw new CustomError('Cart not found', 404);

            const productInCart = cart.products.find(p => p.product._id !== pid);
            if (!productInCart) return res.status(404).json({ message: "Product not in cart" });

            productInCart.quantity  = quantity;
            await cart.save();
        }catch(error){
            throw new Error(error);
        }
    }

    deleteAllProdCart = async(id) => {
        try{
            const cart = await this.model.findById(id);
            if(!cart) throw new CustomError('Cart not found', 404);
            cart.products = [];
            await cart.save();
        }catch(error){
            throw new Error(error);
        }
    };

    getCartById = async(id) =>{
        try{
            return await this.model.findById(id).populate("products.product");
        }catch(error){
            throw new Error(error);
        }
    };

}

export const cartDao = new CartDaoMongo(CartModel);