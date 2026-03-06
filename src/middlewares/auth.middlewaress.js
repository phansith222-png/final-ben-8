import createError from "http-errors";
import jwt from "jsonwebtoken"

import { findDoctorPatientById, findUserPatientById } from "../services/auth.service.js";

export async function authDoctorCheck(req,res,next) {
    try {
        const authorization = req.headers.authorization
        if(!authorization){
            throw createError(401,'Unauthorization')
        }
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token,process.env.JWT_SECRET_DOCTOR,{
            algorithms:["HS256"]
        })
        const doctor = await findDoctorPatientById(payload.id)
        if(!doctor) {
            throw createError(401,"Unauthorization")
        }
        req.doctor = doctor
        next()
    } catch (error) {
        next(error)
    }
}
export async function authUserCheck(req,res,next) {
    try {
        const authorization = req.headers.authorization
        if(!authorization){
            throw createError(401,'Unauthorization')
        }
        const token = authorization.split(" ")[1]
        console.log(token)

        const payload = await jwt.verify(token, process.env.JWT_SECRET_USER,{
            algorithms:["HS256"],
        })


        console.log(payload)
        const user = await findUserPatientById(payload.id)
        if(!user) {
            throw createError(401,"Unauthorization")
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}