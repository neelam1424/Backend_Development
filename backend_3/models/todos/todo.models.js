// step3: npm init -y 
// step2: installed express
// step3: installed mongooes [npm i mongoose]
// [Phase 1: data to store in database]
// step4: create folder models
// step5: folder todos
// step6: file name todo.models.js [for todo content]



import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete:{
        type: Boolean,
        default: false,
    },
    // create realtion with user
    // remember 2 things :- 
    //                     this is special type
    //                     this is reference
    createdBy:{
        // going to give reference Type
        type: mongoose.Schema.Types.ObjectId,
        //conpulsory :- reference
        ref: "User"
    },
    //subtodods (array with multiple objects)
    subTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTodo"

        }
    ]// array of subtodos

},{timestamps:true})

export const Todo = mongoose.model('Todo', todoSchema)