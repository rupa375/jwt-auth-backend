import generateToken from "../config/token.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userName } = req.body;

    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let profileImage;
    if (req.file) {
      profileImage = await uploadOnCloudinary(req.file.path);
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      userName,
      password: hashedPassword,
      profileImage,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error); // Shows exact reason in terminal
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const match = await bcrypt.compare(password, existUser.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(existUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      user: {
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        email: existUser.email,
        userName: existUser.userName,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};