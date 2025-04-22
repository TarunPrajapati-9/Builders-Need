import mongoose, { Schema, Document, Types } from "mongoose";

// Step 1: Define the Type for Cart Item
interface CartItem {
  productId: Types.ObjectId;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
  sellerId?: Types.ObjectId;
}

// Step 2: Define the Type for Cart
export interface CartDocument extends Document {
  userId: Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Step 3: Create the cartItemSchema
const cartItemSchema = new Schema<CartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
});

// Step 4: Create the full cart schema
const cartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

// Step 5: Export the model
const Cart = mongoose.model<CartDocument>("Cart", cartSchema);
export default Cart;
