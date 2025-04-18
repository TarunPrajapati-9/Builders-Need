import { Schema, model, Document, ObjectId } from "mongoose";

// Define TypeScript interface for Item
interface IItem extends Document {
  sellerId: ObjectId; // Reference to Seller model
  name: string;
  description: string;
  category:
    | "Flooring"
    | "Plumbing"
    | "Concrete & Masonry"
    | "Electrical & Lighting"
    | "Other";
  imageUrl: string;
  price: number;
  quantity: number;
  discount?: number;
  ratings?: number[]; // Array of ratings
  status?: "active" | "out-of-stock" | "discontinued"; // Restrict values
  createdAt?: Date;
  updatedAt?: Date;
}

// Define Mongoose schema with TypeScript
const ItemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Flooring",
        "Plumbing",
        "Concrete&Masonry",
        "Electrical&Lighting",
        "Other",
      ],
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        type: Number,
        min: 1,
        max: 5,
      },
    ],
    status: {
      type: String,
      enum: ["active", "out-of-stock", "discontinued"],
      default: "active",
    },
  },
  {
    timestamps: true, // Enables createdAt & updatedAt fields
  }
);

// Export the Mongoose model with TypeScript
export default model<IItem>("Item", ItemSchema);
