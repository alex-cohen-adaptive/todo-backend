import {ITodo} from "../interface/todo.interface";
import Todo from "../model/todo.model";
import mongoose, {ObjectId, Schema} from "mongoose";

interface Page {
    page:number,
    size:number
}
enum Result {
    SUCCESS,
    FAILURE
}

interface CRUD  {
    create: (todo: ITodo) => Promise<Result>;
    getAll: (page: Page) => Promise<ITodo[]>;
    get: (id: ObjectId) => Promise<ITodo | null>;
    delete: (id:number) => Promise<Result>;
    edit: (todo:ITodo) => Promise<Result>;
}

export class TodoService implements CRUD {
    create(todo: ITodo): Promise<Result> {
        let {title,description} = todo;

        const newTodo =  new Todo({
             _id: new mongoose.Types.ObjectId(),
            title,
            description
         })
        return newTodo.save()
            .then(result => {return Promise.resolve(Result.SUCCESS);})
            .catch(err => {return Promise.resolve(Result.FAILURE);})
    }

    delete(id: number): Promise<Result> {
        return Promise.resolve(Result.SUCCESS);
    }

    edit(todo: ITodo): Promise<Result> {
        return Promise.resolve(Result.SUCCESS);
    }

    get(id: ObjectId): Promise<ITodo|null> {
        return Promise.resolve(Todo.findById({_id:id}));
    }

    getAll(page: Page): Promise<ITodo[]> {
        return Promise.resolve([]);
    }


}