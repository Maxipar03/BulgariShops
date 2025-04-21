import FSDao from "./fs-dao.js";
import path from 'path'

class ProductDaoFS extends FSDao {
    constructor(path) {
        super(path);
    }
}

export const productDao = new ProductDaoFS(path.join(process.cwd(), "src/data/products.json"));