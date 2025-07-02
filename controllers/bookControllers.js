import { BookModel } from "../models/bookModel.js";
import { decodeJWT } from "../utils/generateToken.js";

export const getBooksController = async (req, res) => {
  try {
    const user = req.user;
    const books = await BookModel.find();

    return res.status(200).json({
      success: true,
      data: books,

      userInfo: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createBookController = async (req, res) => {
  try {
    const reqBody = req.body;

    const book = await BookModel.create(reqBody);

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBookController = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const reqBody = req.body;

    const foundBook = await BookModel.findById(bookId);

    if (foundBook) {
      const updatedBook = await BookModel.findByIdAndUpdate(bookId, reqBody, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        data: updatedBook,
      });
    }

    res.status(400).json({
      success: false,
      message: `Book with id: ${bookId} not found!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    const foundBook = await BookModel.findById(bookId);

    if (foundBook) {
      await BookModel.findByIdAndDelete(bookId);

      return res.status(204).json({
        success: true,
        message: `${foundBook.title} has been deleted successfully!`,
      });
    }

    res.status(400).json({
      success: false,
      message: `Book with id: ${bookId} not found!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
