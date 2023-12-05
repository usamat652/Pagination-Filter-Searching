import express from 'express';
import './config/connectDb.js';
import userRouter from './routes/user.js';

const app= express();
app.use(express.json());


app.use('/user', userRouter);


app.listen(3000, ()=>{
    console.log("server running at http:localhost:3000/");
});