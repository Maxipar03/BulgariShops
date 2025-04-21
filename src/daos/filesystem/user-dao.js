import FSDao from "./fs-dao.js";
import path from 'path'

class UserDaoFS extends FSDao {
    constructor(path) {
        super(path);
    }
}

export const userDao = new UserDaoFS(path.join(process.cwd(), "src/data/users.json"));