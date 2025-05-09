import 'dotenv/config';
// import { userDao } from "../daos/filesystem/user-dao.js";
import { userDao } from "../daos/mongodb/user-dao.js"
import { createHash, isValidPassword } from "../utils/user-utils.js";
import CustomError from "../utils/custom-error.js";
import  jwt  from "jsonwebtoken";

class UserService {
    constructor(dao) {
        this.dao = dao;
    }

    getById = async (id) => {
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw error;
        }
    };

    getByEmail = async (email) => {
        try {
            const user = await this.dao.getByEmail(email);
            return user
        }catch(error){
            throw error
        }
    };

    register = async (body) => {
        try{
            console.log("adawdad")
            const {email,password} = body;
            const existUser = await this.getByEmail(email);
            if (existUser) throw new CustomError('User already exists', 400);
            const response = await this.dao.create({
                ...body,
                password: createHash(password)
            })
            if (!response) throw new CustomError('Error registering user', 400);
            return response;
        }catch(error){
            throw error
        }
    };

    login = async (email, password) => {
        try{
            const existUser = await this.getByEmail(email);
            if (!existUser) throw new CustomError("User Not Found", 400);
            const validPassword = isValidPassword(password, existUser.password);
            if (!validPassword) throw new CustomError("Invalid Password", 400);
            return existUser;
        }catch(error){
            throw error;
        }
    }

    generateToken = (user) => {
        const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        };
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
    }
}

export const userService = new UserService(userDao); 