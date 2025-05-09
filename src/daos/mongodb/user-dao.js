import MongoDao from "./mongo-dao.js";
import { UserModel } from "./models/user-model.js";

class UserDaoMongo extends MongoDao {
    constructor(model){
        super(model);
    }

    getByEmail = async(email) => {
        try{
            return await this.model.findOne({email});
        }catch(error){
            throw new Error(error)
        }
    }
};

export const userDao = new UserDaoMongo(UserModel);