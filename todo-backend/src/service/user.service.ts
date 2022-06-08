import User from "../model/user.model";
import mongoose from "mongoose";
import {Result} from "./todo.service";
import {IUser} from "../interface/user.interface";
import {noRawAttributes} from "sequelize/types/utils/deprecations";
import bcrypt from "bcrypt";

const saltRounds =10;

interface CRUD {
    exists: (email: string) => Promise<boolean>;
    // usernameExists: (email: string) => Promise<boolean>;
    create: (user: IUser) => Promise<Result>;
}

export class UserService implements CRUD {



    exists(email: string): Promise<boolean> {
        console.log(email);
       return User.where({email: email})
           // .exists()
             .then(result => {
                     console.log(result);
                     return true;
                 }
             )
            .catch(err => {return false});
    }

    create(user: IUser): Promise<Result> {
        const hash = bcrypt.hashSync(user.password, saltRounds);

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: hash
        });

        return newUser.save()
            .then(result => {
                return Promise.resolve(Result.SUCCESS)
            })
            .catch(err => {
                return Promise.resolve(Result.FAILURE);
            })
    }
}
