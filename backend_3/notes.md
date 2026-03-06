### Before starting with thw database design first know what datapoint you want to save in the database and what relation to need between them then start the coding part

#### step1:- npm init -y
#### step2:- npm i express
#### step4:- npm i mongoose
#### step5:- import mongoose from 'mongoose'
#### step6:- create schema 
``` 
new mongoose.Schema({
    username: {
        type: String
        reuired: true
    },
    //for reference and relation between models
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User
    }
}, {timestamps: true}) 
```

#### step7:- create and export model 
`export const user = mongoose.model("model_name", Schema) `

