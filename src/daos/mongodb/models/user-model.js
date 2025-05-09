import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        index: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "cart",
        default: null
    },
    role: {
        type: String,
        default: "User",
    }
});

UserSchema.pre('find', function () {
    this.populate('carts');
});

UserSchema.plugin(mongoosePaginate);

export const UserModel = model("users", UserSchema);