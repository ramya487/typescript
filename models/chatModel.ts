import mongoose, { Schema, model } from "mongoose";

interface TChat {
  chatName: string;
  isGroupChat: boolean;
  users: Array<mongoose.Schema.Types.ObjectId>;
  latestMessage: mongoose.Schema.Types.ObjectId;
  groupAdmin: mongoose.Schema.Types.ObjectId;
}

const chatSchema = new Schema<TChat>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);

export default Chat;
