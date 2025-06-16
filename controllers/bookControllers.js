import { BookModel } from "../models/bookModel.js"

export const getBookController = async(req,res) =>{
    try {
        const books = await BookModel.find();

    res.json({
        success:true,
         data:books,
    })
    } catch (error) {
        console.log(error);
        
        res.json({
            success:false,
            message:error.message,
        })
    }
}

export const createBookController = async(req,res) => {
    try {
        const reqBody = req.body;
    const book = await BookModel.create(reqBody);
    res.json({
        success:true,
         data:book,
    })
    } catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:error.message,
    })
            
    }
}


export const update = async(req,res) =>{
   try {
    const {id: bookId} = req.params;
    const reqBody = req.body;
    const foundBook = await BookModel.findById(bookId);
    if(foundBook){
        const updatedBook = await BookModel.findByIdAndUpdate(bookId, reqBody, {
            new:true,
        });
        res.json({
            success:true,
            data:updatedBook,
        })
    }
    res.json({
        success:false,
        message:`Book with id: ${bookId} is not found`,
    })
   } catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:`Book with id: ${bookId} is not found`,
    
    })
    
   }
}

export const deleteBook = async (req,res) => {
    try {
        const {id: bookId} = req.params;
    // const reqBody = req.body;
    const foundBook = await BookModel.findById(bookId);
    if(foundBook){
        const updatedBook = await BookModel.findByIdAndDelete(bookId); 

        res.json({
            success:true,
            message:`Book with id: ${bookId} is deleted successfully`,
        })
    }
    res.json({
        success:false,
        message:`Book with id: ${bookId} is not found`,
    })
   
  
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:`Book with id: ${bookId} is not found`,
        })
        
    }
    
}