//waitlist model
import mongoose, { Schema, Document } from "mongoose";

interface WaitlistAttributes {
  email: string;
  firstName: string;
  lastName: string;
  subscribed: boolean;
}

interface WaitlistDocument extends WaitlistAttributes, Document {}

const waitlistSchema = new Schema<WaitlistDocument>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  subscribed: { type: Boolean, default: false },
});

const Waitlist = mongoose.model<WaitlistDocument>("Waitlist", waitlistSchema);

export default Waitlist;
