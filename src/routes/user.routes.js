import express from "express";
import { authUserCheck } from "../middlewares/auth.middlewaress.js";
import { getUser, putUser } from "../controllers/user.controllers.js";

const userRoutes = express.Router()

userRoutes.get("/me",authUserCheck,getUser)
userRoutes.put("/me",authUserCheck,putUser)


export default userRoutes