import User from "../model/User.Model";
import mongoose from "mongoose";
import {Result} from "./Todo.Service";
import {IUser} from "../interface/user.interface";
import bcrypt from "bcrypt";
import {emitKeypressEvents} from "readline";

interface CRUD {
    exists: (email: string) => Promise<boolean>;
    create: (user: IUser) => Promise<Result>;
    get: (username: string) => Promise<IUser | null>;
    getAll: () => Promise<Array<IUser | null>>;
}

export class UserService implements CRUD {

    public async exists(email: string): Promise<boolean> {
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

    async create(user: IUser): Promise<Result> {
        try {
            const hashPassword = await bcrypt.hash(user.password, 10);

            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: hashPassword
            });

            return newUser.save()
                .then(result => {
                    return Promise.resolve(Result.SUCCESS)
                })
                .catch(err => {
                    return Promise.reject(Result.FAILURE);
                })
        } catch {
            return Promise.resolve(Result.FAILURE);
        }

    }

    async get(email: string): Promise<IUser | null> {
        return Promise.resolve(User.findOne({email: email}));
    }

    async getAll(): Promise<Array<IUser>> {
        return User.find()
            .then(
                result => {
                    return result;
                }
            );
    }


}
