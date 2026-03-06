// step3: npm init -y 
// step2: installed express
// step3: installed mongooes [npm i mongoose]
// [Phase 1: data to store in database]
// step4: create folder models
// step5: folder todos
// step6: file name sub_todo.models.js [for todo information inside todos categories]



import mongoose from 'mongoose'

const subTodoSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        unique: true,
    },
    complete:{
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})


export const subTodo = mongoose.model("SubTodo", subTodoSchema)


