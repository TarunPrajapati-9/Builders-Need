import { Schema, model, Document } from "mongoose";

// Define TypeScript interface for Item
interface IItem extends Document {
  name: string;
  description: string;
  category:
    | "Flooring"
    | "Senting"
    | "Plumbing"
    | "Concrete & Masonry"
    | "Electrical & Lighting"
    | "Other";
  imageUrl: string;
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
        "Senting",
        "Plumbing",
        "Concrete & Masonry",
        "Electrical & Lighting",
        "Other",
      ],
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Enables createdAt & updatedAt fields
  }
);

// Export the Mongoose model with TypeScript
export default model<IItem>("Item", ItemSchema);
