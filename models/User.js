import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
