import { Schema, model } from "mongoose";
import { compare } from "bcrypt";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.comparePassword = async (password, hashPassword) => {
  return compare(password, hashPassword);
};

export const User = model("User", UserSchema);
