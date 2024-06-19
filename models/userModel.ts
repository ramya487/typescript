import { Schema, model } from "mongoose";

interface TUser {
  name: string;
  email: string;
  passwd: string;
}

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwd: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
