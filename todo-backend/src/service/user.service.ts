import User from "../model/user.model";
import mongoose from "mongoose";
import {Result} from "./todo.service";
import {IUser} from "../interface/user.interface";
import {noRawAttributes} from "sequelize/types/utils/deprecations";
import bcrypt from "bcrypt";

const saltRounds = 10;

interface CRUD {
    exists: (email: string) => Promise<boolean>;
    create: (user: IUser) => Promise<Result>;
    get: (username: string) => Promise<IUser | null>;
    getAll: () => Promise<Array<IUser | null>>;
}

export class UserService implements CRUD {


    exists(email: string): Promise<boolean> {
        console.log(email);
        return User.exists({email: email})
            .then(result => {
                    return result !== null
                }
            )
            .catch(err => {
                return false
            });
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

    get(username: string): Promise<IUser | null> {
        return Promise.resolve(User.findOne({username: username}));
    }

    getAll(): Promise<Array<IUser | null>> {
        console.log("get-all")
        return User.find()
            .then(
                result => {
                    return result;
                }
            );
        // return Promise.resolve([null]);
        // return Pr
        // omise.resolve(User.find());
    }
}
