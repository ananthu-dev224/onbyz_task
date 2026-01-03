import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./auth.model.js";
import { env } from "../../config/env.js";

export const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );

  return { user, token };
};
