import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getAllProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(products);
            } else return [];
        } catch (error) {
            throw new Error(error);
        }
    }

    async createProduct(obj) {
        try {
            const product = {
                id: uuidv4(),
                status: true,
                ...obj,
            };
            const products = await this.getAllProducts(); //[] | [{}, {}]
            const productExist = products.find((p) => p.id === product.id);
            if (productExist) throw new Error("Product already exists");
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            throw error;
        }
    }

    async getProductsByid(id) {
        try {
            const products = await this.getAllProducts();
            const productExist = products.find((u) => u.id === id);
            if (!productExist) throw new Error("Product does not exist");
            return productExist;
        } catch (error) {
            throw error;
        }
    }


    async updateProduct(id, updatedObj) {
        try{
            const products = await this.getAllProducts();
            let productExist = await this.getProductsByid(id);
            productExist = {...productExist, ...updatedObj};
            const newArray = products.filter((p) => p.id !== id);
            newArray.push(productExist);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return productExist;
        }catch (error){
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getAllProducts();
            if (products.length) {
                const productExist = await this.getProductsByid(id);
                if (productExist) {
                    const newArray = products.filter((u) => u.id !== id);
                    await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                    return newArray;
                }
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    }    
}

export const manager = new ProductManager('./src/data/products.json');