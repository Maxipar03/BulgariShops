import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";

class CartManager {
    constructor(path) {
        this.path = path
    }

    async createCart() {
        const cart = {
            id: uuidv4(),
            products: []
        };

        try {
            if (fs.existsSync(this.path)) {
                const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
                carts.push(cart);
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
                return cart;
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify([cart]));
                return cart;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartById(id) {
        try {
            const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
            const cartExist = carts.find((c) => c.id == id);
            if (!cartExist) throw new Error("Cart does not exist");
            return cartExist.products;
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
            const products = JSON.parse(await fs.promises.readFile("./src/data/products.json", "utf-8"))
            
            const cartIndex = carts.findIndex(c => c.id === cid);
            if (cartIndex === -1) throw new Error("Cart does not exist");

            const productExists = products.some(p => p.id === pid);
            if (!productExists) throw new Error("Cart does not exist");

            const cart = carts[cartIndex];
            const productIndex = cart.products.findIndex(p => p.product === pid);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }

            carts[cartIndex] = cart;

            await fs.promises.writeFile(this.path, JSON.stringify(carts));

            return carts;
        } catch (error) {
            throw error;
        }
    }
    

}

export const manager = new CartManager('./src/data/carts.json');