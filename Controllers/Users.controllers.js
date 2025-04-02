// this file control all thing as a name from router to model and revers
// we write exports to can call this function or model from any where in Project
const userModel = require('../Models/Users.models');
const bycrpt = require('bcrypt'); // to hash password
var jwt = require('jsonwebtoken'); // to create token across login


exports.register = async function(req,res) {
  try {
    let newUser = new userModel(req.body);

    //! Hash Password ====================
    const hashPassword = await bycrpt.hash(req.body.password, 10);
    newUser.password = hashPassword;
    let user = await newUser.save();
    //! Hash Password ====================

    return res.json({message: "User Created Successfully", user: {name: user.name , email: user.email}});
  
  } catch (error) {
    console.log('Register Error',error);
    res.status(400).send({
      message: error
    })
  }
}

exports.login = async function(req,res) {
  try {
    // let user = await userModel.findOne({ email: req.body.email, password: req.body.password });
    let user = await userModel.findOne({ email: req.body.email });

    //! check if email and compared password right ? =====================
    if (!user || !await user.comparePassword(req.body.password)) {
      res.status(400).send({message: "Invalid Email or Password !"});
    
    } else {
      let token = jwt.sign({ email: user.email , _id: user._id, role: user.role }, 'secretKey');
      return res.json({message: "User Logged in Successfully", user: {name: user.name , email: user.email, jwt: token}});
    }
  } catch (error) {
    console.log('Login Error',error);
    res.status(400).send({
      message: error
    })
  }
}


