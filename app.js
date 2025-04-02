const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const userRouter = require('./Routers/Users.routers')
const bookRouter = require('./Routers/books.router')


const app = express()
app.use(bodyParser.json())
const port = 3300
const uri = "mongodb+srv://mag:mag123mag@mag.zlacb.mongodb.net/?retryWrites=true&w=majority&appName=Mag";

//todo : function to connect with DataBase
const connectToDB = async ()=>{
  try {
    mongoose.set('strictQuery',false);
    mongoose.connect(uri)
    console.log("Done 👍, connected to DB");
  } catch (error) {
    console.log("the error is", error);
    process.exit();
  }
}
//! Call the function
connectToDB();




//! Handle Routers file
app.use('/' , userRouter) // this mean: any request '/' send it to 'userRouter'
app.use('/' , bookRouter)
// if this request not found what app will do !
app.use(function(req,res){
  res.status(400).send({url: req.originalUrl + " not found"});
})







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

