// this file for schema of database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = Schema({
  name: String,
  email: String,
  age: Number,
  password: String, // we use 'bycrpt' or 'bycrptjs' method to hash this in controller
  role: String
})
// this method to search on password in Login
userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password) // password will user write it and actual password "123"
}

module.exports = mongoose.model('users', userSchema);



