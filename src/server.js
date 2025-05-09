import "dotenv/config"
import './config/jwt-strategy-cookies.js';
import productRouter from "./routes/product-router.js"
import userRouter from "./routes/user-router.js"
import cartRouter from "./routes/cart-router.js"

import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./daos/mongodb/connection.js";

import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import path from 'path'
import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(`${process.cwd()}/src/public`)));

const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 3600,
    }),
    secret: "adw11233",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
    },
};

app.engine("handlebars", handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));

app.set("views", path.join(`${process.cwd()}/src/views`));
app.set("view engine", "handlebars");

app.use(morgan('dev'));

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

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



