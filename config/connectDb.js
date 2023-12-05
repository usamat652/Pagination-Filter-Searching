import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/Pagination')
.then(()=>{
    console.log("DB Connected");
})
.catch(()=>{
    console.log("Error occur while Connecting");

})
export {};