import User from "../model/user.model";
import mongoose from "mongoose";
import {Result} from "./todo.service";
import {IUser} from "../interface/user.interface";
import bcrypt from "bcrypt";

const saltRounds = 10;

interface CRUD {
    exists: (email: string) => Promise<boolean>;
    create: (user: IUser) => Promise<Result>;
    get: (username: string) => Promise<IUser | null>;
    getAll: () => Promise<Array<IUser | null>>;
    authenticate: (username:string, password:string)=> Promise<IUser | Result>
}

export class UserService implements CRUD {

    async exists(email: string): Promise<boolean> {
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

    async get(username: string): Promise<IUser | null> {
        return Promise.resolve(User.findOne({username: username}));
    }

    async getAll(): Promise<Array<IUser>> {
        return User.find()
            .then(
                result => {
                    return result;
                }
            );
    }

    async authenticate(username: string, password: string): Promise<IUser | Result> {
        try {
            const user = await this.get(username);
            if (user === null ) {
                return Promise.reject(Result.FAILURE);
            }
            const passwordMatches = await bcrypt.compare(password,user.password);

        }




    }

}
