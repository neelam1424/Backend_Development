//step1: create a folder
//step2: move into that folder
//step3: npm init -y
//step4: open folder using VSCode
//step5: npm i express 
//step6: create server.js
// add type:module and start command in package.json



//initiate server

import express from 'express'
const app = express()


// app.get('/',(req,res)=>{
//     res.send('Server is ready')
// })


//get a list of 5 jokes

// get method
//standarized the url
app.get('/api/jokes', (req,res)=>{
    const jokes = [
        {
            id:1,
            title:'A joke',
            content: 'This is a joke'
        },
        {
            id:2,
            title:'Another joke',
            content: 'This is another joke'
        },
        {
            id:3,
            title:'A third joke',
            content: 'This is a third joke'
        },
        {
            id:4,
            title:'A fourth joke',
            content: 'This is a fourth joke'
        },
        {
            id:5,
            title:'A fifth joke',
            content: 'This is a fifth joke'
        },
    ];
    res.send(jokes);
})


const port = process.env.PORT || 3000;

// Activate Server On 3000 Port

app.listen(port,()=>{
    console.log(`Serve at http://localhost:${port}`)
})