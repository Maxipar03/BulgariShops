import { createHash } from "../utils/user-utils.js";
import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";

class UserManager {
    constructor(path) {
        this.path = path;
    }

    async getAllUsers() {
        try {
            if (fs.existsSync(this.path)) {
                const users = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(users);
            } else return [];
        } catch (error) {
            throw new Error(error);
        }
    }

    async createUser(obj) {
        try {
            const user = {
                id: uuidv4(),
                ...obj,
            };
            const users = await this.getAllUsers(); //[] | [{}, {}]
            const userExists = users.find((u) => u.id === user.id);
            if (userExists) throw new Error("User already exists");
            createHash(user)
            users.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(users));
            return user;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, updatedObj) {
        try{
            const users = await this.getAllUsers();
            let userExists = await this.getUserByid(id);
            userExists = {...userExists, ...updatedObj};
            createHash(userExists);
            const newArray = users.filter((u) => u.id !== id);
            newArray.push(userExists);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return userExists;
        }catch (error){
            throw error;
        }
    }

    async getUserByid(id) {
        try {
            const users = await this.getAllUsers();
            const userExists = users.find((u) => u.id === id);
            if (!userExists) throw new Error("User does not exist");
            return userExists;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const users = await this.getAllUsers();
            if (users.length) {
                const userExists = await this.getUserByid(id);
                if (userExists) {
                    const newArray = users.filter((u) => u.id !== id);
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

export const manager = new UserManager('./src/data/users.json');