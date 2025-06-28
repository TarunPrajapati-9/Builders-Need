import mongoose, { Schema, Document, Types } from "mongoose";

export interface Transaction {
  _id?: Types.ObjectId;
  type: "credit" | "debit";
  amount: number;
  refId?: string;
  status: "pending" | "approved" | "rejected";
  date: Date;
}

export interface UserWalletDocument extends Document {
  userId: Types.ObjectId; // reference to user
  pin: string;
  balance: number;
  transactions: Transaction[];
  lastUpdated: Date;
}

const transactionSchema = new Schema<Transaction>(
  {
    type: { type: String, enum: ["credit", "debit"], required: true },
    amount: { type: Number, required: true },
    refId: { type: String, required: true, unique: true }, // Unique reference ID for the transaction
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

const userWalletSchema = new Schema<UserWalletDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    pin: { type: String, required: true }, // 4-digit PIN
    balance: { type: Number, default: 0 },
    transactions: [transactionSchema],
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const UserWallet = mongoose.model<UserWalletDocument>(
  "UserWallet",
  userWalletSchema
);

export default UserWallet;
