import express from "express";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
  updateTransactionStatus,
} from "../controllers/transactionControllers.js";
import { checkStaffLevelPermissions } from "../middleware/CheckPermissions.js";

const router = express.Router();

router
  .route("/")
  .post(checkAuthorization, createTransaction)
  .get(getTransactions);

router
  .route("/:transactionId")
  .put(checkAuthorization, checkStaffLevelPermissions, updateTransaction)
  .patch(
    checkAuthorization,
    checkStaffLevelPermissions,
    updateTransactionStatus
  )
  .delete(checkAuthorization, checkStaffLevelPermissions, deleteTransaction);

export default router;
