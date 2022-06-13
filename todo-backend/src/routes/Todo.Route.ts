import express, {Router} from 'express';
import {Page, TodoService} from "../service/Todo.Service";
import {authenticationService} from "./Authentication.Route";

const router = Router();
const app = express();

const todoService: TodoService = new TodoService();

// app.use("/todos",router);
router
    .post("/todos", async (req, res, next) => {
        console.log(req.body);
        res.sendStatus(201).send( await todoService.create(req.body));
        next();
        // return next();
    })
    .put("/todos",async (req, res, next) => {
        res.sendStatus(200).send(await todoService.edit(req.body));
    })
    .get("/todos/:id", async (req,res,next) => {
        res.send( await todoService.get(req.params.id));
        next();

    })
    .get("/todos", async (req, res, next) => {
        let page:number = parseInt(req.query.page as string)
        let size:number = parseInt(req.query.size as string);
        res.send(await todoService.getAll(new Page(page,size)));
        next();
    })
    .delete("/todos/:id" ,async (req,res,next) => {
        console.log(req.params.id as string)
        res.sendStatus(200).send(await  todoService.delete(req.params.id))

    })

app.use('/todos', router);
export {router};