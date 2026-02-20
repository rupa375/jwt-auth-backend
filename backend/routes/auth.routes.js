import express from "express";
import {login, logout, signUp } from "../controllers/auth.controllers.js";
import { upload } from "../middleware/multer.js";
const authRouter=express.Router();

authRouter.post("/signup",upload.single("profileImage"),signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logout)




export default authRouter;