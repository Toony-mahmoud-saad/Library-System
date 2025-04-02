// Used to record names of api's
const Router = require('express');
const router = Router();
const bookController = require('../Controllers/books.controllers');
const authintication = require('../middlewares/auth')


router.post('/api/books', authintication, bookController.addBook); // add new book
router.get('/api/books', authintication , bookController.readAllBooks); // read all books
router.get('/api/books/:id', authintication , bookController.readOneBook); // read one book
router.delete('/api/books/:id', authintication , bookController.deleteBook); // delete one book
router.put('/api/books/:id', authintication, bookController.updateBook)

module.exports = router ;
