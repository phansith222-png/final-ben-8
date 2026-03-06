import express from "express";
import { loginDoctor, loginUser, registerDocter, registerPatient } from "../controllers/auth.controllers.js";

const authRoute = express.Router()

authRoute.post("/register/doctor",registerDocter)

authRoute.post("/register/user",registerPatient)

authRoute.post("/login/doctor",loginDoctor)

authRoute.post("/login/user",loginUser)

export default authRoute