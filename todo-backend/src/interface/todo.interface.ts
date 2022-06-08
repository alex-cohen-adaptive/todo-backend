import {Document, Schema} from "mongoose";

export interface ITodo extends Document{
    title:string
    description: string
    completed:boolean
}
