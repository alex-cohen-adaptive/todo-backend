import {ITodo} from "../interface/todo.interface";
import Todo from "../model/Todo.Model";
import mongoose, {mongo, ObjectId, Schema} from "mongoose";
import {query} from "express";

interface IPage {
    page:number,
    size:number
}
export class Page implements IPage {
    page: number;
    size: number;

    constructor(page: number, size: number) {
        this.page = page;
        this.size = size;
    }
}

export enum Result {
    SUCCESS,
    FAILURE
}

interface CRUD  {
    create: (todo: ITodo) => Promise<Result>;
    getAll: (page: IPage) => Promise<Array<ITodo>>;
    get: (id: string) => Promise<ITodo | null>;
    delete: (id:string) => Promise<Result>;
    edit: (todo:ITodo) => Promise<Result>;
}

export class TodoService implements CRUD {
    create(todo: ITodo): Promise<Result> {
        let {completed,title,description} = todo;
        console.log(completed,title,description);

        const newTodo =  new Todo({
             _id: new mongoose.Types.ObjectId(),
            title,
            description,
            completed
         })
        return newTodo.save()
            .then(result => {return Promise.resolve(Result.SUCCESS);})
            .catch(err => {return Promise.resolve(Result.FAILURE);})
    }

    delete(id: string): Promise<Result> {
        return Todo.deleteOne({_id: id})
            .then(result => {return Promise.resolve(Result.SUCCESS);})
            .catch(err => {return Promise.resolve(Result.FAILURE);})
    }

    edit(todo: ITodo): Promise<Result> {
        const id = todo._id;
        console.log(todo);
        return Todo.findOneAndUpdate({_id:id}, todo)
            .then(result => {
                return Promise.resolve(Result.SUCCESS);
            })
            .catch(err => {return Promise.resolve(Result.FAILURE);});
    }

     get(id: string): Promise<ITodo|null> {
        return Promise.resolve(Todo.findById({_id:id}));
    }

    getAll(page: IPage): Promise<Array<ITodo>> {
        // const result = Todo.find()
        //     .then(
        //         result=> {
        //             return result
        //         }
        //     );
        console.log("page",page.page);
        const result = Todo.paginate({},{page: page.page, limit:page.size})
            .then(result => {
                console.log(result.docs)
                return result.docs
            })
        return Promise.resolve(result);
    }
}