import mongoose, {Schema} from 'mongoose';
import {ITodo} from "../interface/todo.interface";
import mongoosePaginate  from 'mongoose-paginate';

const todo:Schema = new Schema<ITodo>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed:  {type: "boolean", required: true},
}, {
    timestamps: true
});

todo.plugin(mongoosePaginate)

export default mongoose.model<ITodo>('Todo',todo);
