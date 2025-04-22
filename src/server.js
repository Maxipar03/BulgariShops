import productRouter from "./routes/product-router.js"
import userRouter from "./routes/user-router.js"
import cartRouter from "./routes/cart-router.js"
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./daos/mongodb/connection.js";

import path from 'path'
import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(`${process.cwd()}/src/public`)));

app.engine("handlebars", handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));

app.set("views", path.join(`${process.cwd()}/src/views`));
app.set("view engine", "handlebars");

app.use(morgan('dev'));

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/carts', cartRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

initMongoDB()
    .then(() => console.log("Base de datos Mongo conectada"))
    .catch((error) => console.log(error));



