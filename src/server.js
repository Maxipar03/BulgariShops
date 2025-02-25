import userRouter from "./routes/user-router.js";
import productRouter from "./routes/product-router.js"
import cartRouter from "./routes/cart-router.js"
import { errorHandler } from "./middlewares/errorHandler.js";
import { manager } from "./managers/product-manager.js";
import viewsRouter from "./routes/views-router.js"

import path from 'path'
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import morgan from "morgan";
import router from "./routes/user-router.js";


const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(`${process.cwd()}/src/public`)));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${process.cwd()}/src/views`));
app.set("view engine", "handlebars");


app.use(morgan('dev'));

app.use('/carts', cartRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/', viewsRouter);

app.use(errorHandler);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
    console.log(`🟢 Usuario conectado ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`🔴 Usuario desconectado ${socket.id}`);
    });

    socketServer.emit('productsRender', await manager.getAllProducts());

    socket.on('product:add', async (product) => {
        await manager.createProduct(product);
        socketServer.emit('productsRender', await manager.getAllProducts());
    })

    socket.on('product:delete', async (product) => {
        await manager.deleteProduct(product);
        socketServer.emit('productsRender', await manager.getAllProducts());
    })
});
