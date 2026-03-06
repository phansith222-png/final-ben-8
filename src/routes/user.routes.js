import express from "express";
import { authUserCheck } from "../middlewares/auth.middlewaress.js";
import { getUser } from "../controllers/user.controllers.js";

const userRoutes = express.Router()

userRoutes.get("/me",authUserCheck,getUser)

export default userRoutes