import { Schema, model } from "mongoose";

interface TUser {
  name: string;
  email: string;
  passwd: string;
  pic: string;
}

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true }, // make it unique
    passwd: { type: String, required: true },
    pic: { type: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
