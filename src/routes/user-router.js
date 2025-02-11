import { Router } from "express";
import { userValidator, userRoleValidate } from "../middlewares/userValidator.js";
import { paramsValidator } from "../middlewares/paramsValidator.js";
import { manager } from "../managers/user-manager.js";

const router = Router();

router.get('/', userRoleValidate , async(req, res, next)=>{
    try {
        const users = await manager.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', [paramsValidator], async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await manager.getUserByid(id);
        return res.json(user);
    } catch (error) {
        next(error);
    }
});


router.post('/',  async (req, res, next) => {
    try {
        const user = await manager.createUser({
            ...req.body
        });
        return res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', [paramsValidator], async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDel = await manager.deleteUser(id);
        return res
            .status(200)
            .json({ message: `User delete ok - id: ${userDel.id}` });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', [paramsValidator, userValidator], async (req, res, next) => {
    try {
        const { id } = req.params;
        const userUpd = await manager.updateUser(req.body, id);
        return res.status(200).json(userUpd);
    } catch (error) {
        next(error);
    }
});

export default router;

