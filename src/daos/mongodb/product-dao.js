import { ProductModel } from "./models/product-model.js";
import MongoDao from "./mongo-dao.js";

class ProductDaoMongo extends MongoDao {
    constructor(model) {
        super(model);
    }
    
    getAllProducts = async(page = 1, limit = 10, name, sort) =>{
        try{
            const filter = name ? {"name" : name} : {};
            let sortOrder = {};
            if (sort === 'asc' || sort === 'desc') {
                sortOrder.price = sort === 'asc' ? 1 : -1;
            }
            return await this.model.paginate(filter, { page, limit, sort: sortOrder });
        }catch(error){
            throw new Error(error);
        }
    }; 

    getByName = async (name) => {
        try {
            return await this.model.find({ name });
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const productDao = new ProductDaoMongo(ProductModel);