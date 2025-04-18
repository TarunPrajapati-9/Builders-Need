import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  buyerName: string;
  buyerEmail: string;
  items: Array<{
    itemId: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  sellerId: mongoose.Schema.Types.ObjectId;
}

const orderSchema: Schema = new Schema(
  {
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
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
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
