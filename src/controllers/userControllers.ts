import User from "../models/user";
import Waitlist from "../models/waitlist";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// import CustomError from '../utils/customError';
// import { cloudinary } from "../config/cloudinary.js"

import { Request, Response } from "express";

let messages: string[] = [];

//Signup
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, country, phoneNumber, password } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !country ||
      !phoneNumber ||
      !email ||
      !password
    ) {
      throw new Error("Please fill in all fields");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This email already exists");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      country,
      phoneNumber,

      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).send({ message: "Account created successfully!" });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

// Login
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password!");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "90d" }
    );

    res.status(200).send({
      token,
      id: user._id,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

//waitlist: email, firstname and lastname
const waitlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, firstName, lastName, subscribe } = req.body;

    if (!email || !firstName || !lastName) {
      throw new Error("Please fill in all fields");
    }
    //check if email already exist
    const existingEmail = await Waitlist.findOne({ email });

    if (existingEmail) {
      throw new Error("This email already exists");
    }

    const newWaitlist = new Waitlist({
      email,
      firstName,
      lastName,
      subscribe,
    });

    const savedWaitlist = await newWaitlist.save();

    res.status(201).send({ message: "You have been added to the waitlist!" });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

// forgotPassword
const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    // GET USER BASED ON POSTED EMAIL
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("User doesn't exist, check email again");
    }

    // GENERATE A RANDOM RESET TOKEN
    const resetToken: string = user.createResetPasswordToken();
    await user.save();
    console.log(resetToken);

    // SEND TOKEN TO USER EMAIL

    // Respond to the request
    res.status(200).json({
      success: true,
      message: "Token sent to email",
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

// exports.resetPassword = (req, res, next) => {

// }

export { createUser, loginUser, waitlist };
// , forgotPassword
