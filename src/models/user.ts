import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";
interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  passwordResetToken: string;
  passwordResetTokenExpires: Date;
}

interface UserDocument extends UserAttributes, Document {
  createResetPasswordToken(): string;
}

const userSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },

  password: { type: String, required: true },
  passwordResetToken: { type: String },
  passwordResetTokenExpires: { type: Date },
  country: { type: String, required: true },
  // createResetPasswordToken(): { type: string },
});

userSchema.methods.createResetPasswordToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  console.log(resetToken, this.passwordResetToken);
  return resetToken;
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
