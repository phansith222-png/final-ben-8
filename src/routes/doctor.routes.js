import express from "express";
import { authDoctorCheck } from "../middlewares/auth.middlewaress.js";
import { getDoctorUser, putDocterUser } from "../controllers/docter.controllers.js";

const doctorRoutes = express.Router()

doctorRoutes.get("/me",authDoctorCheck,getDoctorUser)
doctorRoutes.put("/me",authDoctorCheck,putDocterUser)

export default doctorRoutes