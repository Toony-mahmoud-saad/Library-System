const bookModel = require('../Models/books.models')


exports.addBook = async function (req,res){
  try {
    const createBook = await bookModel.create(req.body)
    res.json({message: "Book Created", data: createBook});
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error
    })
  }
}

exports.readAllBooks = async function (req,res){
  try {
    const book = await bookModel.find()
    res.json({message: "Done 👍", Books: book});
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error
    })
  }
}

exports.readOneBook = async function(req, res) {
  try {
    let {id} = req.params
    let book =  await bookModel.findById(id);
    res.json({Data: book})
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "This book invalid"
    })
  }
}

exports.deleteBook = async function (req,res){
  try {
    if(req.user.role === 'Admin'){
      await bookModel.findByIdAndDelete(req.params.id)
    res.json({message: "Book Deleted", data: []})
    }else{
      res.status(403).send({
        message: "You can't do this permission, you must be an admin"
      })
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error
    })
  }
}

exports.updateBook = async function(req, res) {
  try {
    let {id} = req.params
    let {name, author, price, descrition} = req.body
    if(req.user.role === "Admin"){
      await bookModel.findByIdAndUpdate(id, {name, author, price, descrition});
      res.json({Message: "Book Updated Successfully."});
    }else{
      res.status(403).send({
        message: "This Option for Admins only"
      })
    }

    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "this book invalid"
    })
  }
}



