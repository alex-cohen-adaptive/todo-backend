import mongoose, {Schema, Document, model, connect} from 'mongoose';
import {ITodo} from "../interface/todo.interface";


const todo:Schema = new Schema<ITodo>({
    title: {type: String, required: true},
    description: {type: String, required: true},
}, {
    timestamps: true
});


export default mongoose.model<ITodo>('Todo',todo);
