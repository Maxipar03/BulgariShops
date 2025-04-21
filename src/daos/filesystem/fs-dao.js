import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";

export default class FSDao {

    constructor(path) {
        this.path = path
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const items = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(items);
            } else return [];
        } catch (error) {
            throw new Error(error);
        }
    }

    async createItem(obj) {
        try {
            const item = {
                id: uuidv4(),
                status: true,
                ...obj,
            };
            const items = await this.getAll(); //[] | [{}, {}]
            const itemExist = items.find((i) => i.id === item.id);
            if (itemExist) throw new Error("Product already exists");
            items.push(item);
            await fs.promises.writeFile(this.path, JSON.stringify(items));
            return item;
        } catch (error) {
            throw error;
        }
    }

    async getByid(id) {
        try {
            const items = await this.getAll();
            const itemExist = items.find((u) => u.id === id);
            if (!itemExist) throw new Error("Product does not exist");
            return itemExist;
        } catch (error) {
            throw error;
        }
    }


    async update(id, updatedObj) {
        try{
            const items = await this.getAll();
            let itemExist = await this.getByid(id);
            itemExist = {...itemExist, ...updatedObj};
            const newArray = items.filter((i) => i.id !== id);
            newArray.push(itemExist);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return itemExist;
        }catch (error){
            throw error;
        }
    }

    async delete(id) {
        try {
            const items = await this.getAll();
            if (items.length) {
                const itemExist = await this.getByid(id);
                if (itemExist) {
                    const newArray = items.filter((u) => u.id !== id);
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