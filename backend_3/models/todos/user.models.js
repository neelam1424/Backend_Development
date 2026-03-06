// step3: npm init -y 
// step2: installed express
// step3: installed mongooes [npm i mongoose]
// [Phase 1: data to store in database]
// step4: create folder models
// step5: folder todos
// step6: file name user.models.js [for users information]

// NOTE:- In mongodb the model name gets converted into plural and lowercase

// step7: mongoose connection
// how mongoose make model and export those models

// 7.1:- import mongoose
import mongoose from 'mongoose'

// 7.2:- mongoose help in making schema
// Defining the model [what data is it going to store]
const userSchema = new mongoose.Schema({
    // step8: Adding data fileds
    // 8.1: adding the properties as an object. this is the super power of mongodb more details are specified
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  
    },
    password: {
        type: String,
        required: true,    
    }
},
{
    timestamps: true,
}
)


// 7.3:- export models
// build model name and what structure
export const User = mongoose.model('User', userSchema)


// step9: relate each models


