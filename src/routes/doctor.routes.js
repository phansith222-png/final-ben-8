import express from "express";
import { authDoctorCheck } from "../middlewares/auth.middlewaress.js";

const doctorRoutes = express.Router()

doctorRoutes.get("/me",authDoctorCheck,(req,res)=>{
    console.log("TEST Doctor")
})

export default doctorRoutes