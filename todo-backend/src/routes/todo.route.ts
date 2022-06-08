import express, {Router} from 'express';
import {TodoService} from "../service/todo.service";

const router = Router();
const app = express();

const todoService: TodoService = new TodoService();

router
    .post("todos/create",async (req,res,next) => {
        const result = await todoService.create(req.body)
        res.status(201).send(result);
        next();
})

app.use('/products',router);
export {router};