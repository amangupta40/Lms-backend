import express from 'express';
import {getBookController, createBookController,update,deleteBook} from '../controllers/bookControllers.js';
const bookRouter = express.Router();



bookRouter.route('/').get(getBookController)
.post(createBookController);

bookRouter.route('/:id').put(update)
.delete(deleteBook);

bookRouter.get('/', (req,res) => {
    res.json({
        success:true,
        message:"This is root of books",
    })
});

bookRouter.post("/", (req,res) => {
    res.json({
        success:true,
        message:"This is create route of books",
    })
})

export default bookRouter;