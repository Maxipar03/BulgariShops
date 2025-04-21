import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    products:[
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            }   
        }
    ]
});

export const CartModel = model("carts", CartSchema);