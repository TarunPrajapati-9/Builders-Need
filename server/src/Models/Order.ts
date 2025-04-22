import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  sellerId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  items: Array<{
    itemId: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
}

const orderSchema: Schema = new Schema<IOrder>(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
