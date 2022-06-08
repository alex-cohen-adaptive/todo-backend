import mongoose, {Schema} from "mongoose";
import {IUser} from "../interface/user.interface";

const user: Schema = new Schema<IUser>({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true,unique:true},
        password: {type: String, required: true}
    },
    {
        timestamps: true
    })

export default mongoose.model<IUser>('User',user);