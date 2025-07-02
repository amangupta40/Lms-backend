import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "books",
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  returned: {
    type: Boolean,
    default: false,
  },
  estimatedReturnDate:{
    type: Date,
  },
  returnDate: {
    type: Date,
  },
  returnedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["Pending", "Rejected", "Approved"],
    default: "Pending",
  }
});

export const TransactionModel = mongoose.model(
  "transactions",
  transactionSchema
);
