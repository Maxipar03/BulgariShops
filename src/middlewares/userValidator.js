// Validacion de usuario al crearlo

export const userValidator = (req, res, next) => {
    if (
        req.body.email === undefined ||
        typeof req.body.email !== "string" ||
        req.body.password === undefined ||
        typeof req.body.password !== "string" ||
        req.body.age === undefined ||
        typeof req.body.age !== "number"
    )
        
        res.status(404).json(({ error: "invalid body" }));

    return next();

}

// Validacion de rol de usuario

export const userRoleValidate = (req, res, next) => {
    const role = req.headers["user-role"];
    if (role === "admin") next();
    else return res.status(403).json({ message: "No estás autorizado" });
}