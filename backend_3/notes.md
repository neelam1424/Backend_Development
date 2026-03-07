### Before starting with the database design first know what datapoint you want to save in the database and what relation to need between them then start the coding part

#### step1:- npm init -y
#### step2:- npm i express
#### step4:- npm i mongoose
#### step5:- import mongoose from 'mongoose'
#### step6:- create schema 
#### NOTE:- Timestamp gives createdAt() and updatedAt() under the hood
``` 
new mongoose.Schema({
    username: {
        type: String
        reuired: true
    },
    //for reference and relation between models
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User,
    }
}, {timestamps: true}) 
```

#### step7:- create and export model 
`export const user = mongoose.model("model_name", Schema) `


#### NOTE:- when you write model name in mongoose.model. if you even write name of model as "Category" the mongoDB is that intelligent that it will automatically convert it into "categories" but we write the model name in singular form beacuse we need that syntax for making the relations

