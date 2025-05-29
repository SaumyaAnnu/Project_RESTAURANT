//server.js
const express=require('express');
const bodyParser =require('body-parser');
const app= express();

//middleware to parse from data
app.use(bodyParser.urlencoded({extended:true}));

//server the file
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

//Handle for submission
app.post('/submit',(req,res)=>{
    const Name=req.body.name;
    const Email=req.body.email;
    res.send(`Form submitted ! Name:${Name}, Email:${Email}`);
})

//start the server
app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
})
