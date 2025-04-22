import { Schema, model, Document } from "mongoose";

// Define TypeScript interface for Seller
interface ISeller extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
  sellerType: "distributor" | "manufacturer"; // Restrict values
  phone: string;
  profileImage?: string;
  isVerified?: boolean;
  status?: "active" | "inactive" | "suspended"; // Restrict values
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define Mongoose schema with TypeScript
const SellerSchema = new Schema<ISeller>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"], // Email validation
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      enum: ["SURAT", "AHMADABAD", "VADODARA", "RAJKOT"],
    },
    sellerType: {
      type: String,
      required: true,
      enum: ["distributor", "manufacturer"],
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    profileImage: {
      type: String,
      default: "https://yourdomain.com/default.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "inactive",
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Mongoose model with TypeScript
export default model<ISeller>("Seller", SellerSchema);
