import express from "express";
import userRouter from "./routes/user-router.js";
import productRouter from "./routes/product-router.js"
import cartRouter from "./routes/cart-router.js"
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from "morgan";


const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(morgan('dev'));

app.use('/carts', cartRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
