import mongoose from "mongoose";

import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import Account from "../models/accountsModel.js";

const router = Router();

router.get("/balance", verifyToken, async (req, res) => {
  const userId = req.user_id;
  const account = await Account.findOne({
    userId,
  });

  res.json({ balance: account.balance });
});

router.post("/transfer", verifyToken, async (req, res) => {
  const { amount, to } = req.body;

  const account = await Account.findOne({
      userId: req.user_id
  });

  if (account.balance < amount) {
      return res.status(400).json({
          message: "Insufficient balance"
      })
  }

  const toAccount = await Account.findOne({
      userId: to
  });

  if (!toAccount) {
      return res.status(400).json({
          message: "Invalid account"
      })
  }

  await Account.updateOne({
      userId: req.user_id
  }, {
      $inc: {
          balance: -amount
      }
  })

  await Account.updateOne({
      userId: to
  }, {
      $inc: {
          balance: amount
      }
  })

  res.status(200).json({
      message: "Transfer successful"
  })
});

export default router;







//to be used for transactions with Replica Sets
// router.post("/transfer", verifyToken, async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   const { to, amount } = req.body;

//   const account = await Account.findOne({
//     userId: req.user_id,
//   }).session(session);

//   if (!account || account.balance < amount) {
//     await session.abortTransaction();
//     return res.status(400).json({
//       message: "Insufficient balance",
//     });
//   }

//   const toAccount = await Account.findOne({
//     userId: to,
//   }).session(session);

//   if (!toAccount) {
//     await session.abortTransaction();
//     return res.status(400).json({
//       message: "Invalid account",
//     });
//   }

//   await Account.updateOne(
//     {
//       userId: req.user_id,
//     },
//     {
//       $inc: {
//         balance: -amount,
//       },
//     }
//   ).session(session);

//   await Account.updateOne(
//     {
//       userId: to,
//     },
//     {
//       $inc: {
//         balance: amount,
//       },
//     }
//   ).session(session);

//   await session.commitTransaction();
//   res.json({ message: "Transfer successful" });
// });