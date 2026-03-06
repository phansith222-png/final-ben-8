import createError from "http-errors"
import { createDoctorUser, createPatientUser, createTokenDoctor, createTokenUser, findUserDoctorByUsername, findUserPatientByUsername } from "../services/auth.service.js"
import bcrypt from 'bcrypt'


export async function registerDocter(req,res,next) {
    const {username,password,specialization} = req.body
    try {
        const Doctor = await findUserDoctorByUsername(username)
        if(Doctor){
            throw createError(400, "Username already exist...")
        }
        const hash = await bcrypt.hash(password,5)

        const newDoctorUser = await createDoctorUser(username,hash,specialization)
        const checkDoctoruser = await findUserDoctorByUsername(newDoctorUser.username)
        const check = true
        if(!checkDoctoruser){
         check = false
        }
        res.status(201).json({
            success:check,
            message:"Doctor registered successfully",
            data:{
                id:checkDoctoruser.id,
                username:checkDoctoruser.username,
                specialization:checkDoctoruser.specialization,
            }
        })
    } catch (error) {
        next(error)
    }
}

export async function registerPatient(req,res,next){
    const {username,password} = req.body
    try {
        const patient = await findUserPatientByUsername(username)
        if(patient){
            throw createError(400, "Username already exist...")
        }
        const hash = await bcrypt.hash(password,5)
        const newPatientUser = await createPatientUser(username,hash)
        const checkPatientUser = await findUserPatientByUsername(newPatientUser.username)
        const check = true
        if(!checkPatientUser){
         check = false
        }
        res.status(201).json({
            success:check,
            message:"User registered successfully",
            data:{
                id:checkPatientUser.id,
                username:checkPatientUser.username,
                specialization:checkPatientUser.specialization,
            }
        })
    } catch (error) {
        next(error)
    }
}


export async function loginDoctor(req,res,next){
    const {username,password} = req.body
    try {
        const existDoctor = await findUserDoctorByUsername(username)
        const isMatch = await bcrypt.compare(password,existDoctor.password)
        if(!existDoctor || !isMatch){
            throw createError(401,"Invalid credentials")
        }
        const checkDoctoruser = await findUserDoctorByUsername(existDoctor.username)
        const check = true
        if(!checkDoctoruser){
         check = false
        }
        const accessTokenDoctor = await createTokenDoctor(checkDoctoruser)
        res.status(201).json({
            success:check,
            token:accessTokenDoctor,
            doctor:{
                id: checkDoctoruser.id,
                username:checkDoctoruser.username,
                specialization:checkDoctoruser.specialization
            }
        })
    } catch (error) {
        next(error)
    }
}
export async function loginUser(req,res,next){
    const {username,password} = req.body
    try {
        const existPatient = await findUserPatientByUsername(username)
        const isMatch = await bcrypt.compare(password,existPatient.password)
        if(!existPatient || !isMatch){
            throw createError(401,"Invalid credentials")
        }
        const checkuser = await findUserPatientByUsername(existPatient.username)
        // console.log(checkuser)
        const check = true
        if(!checkuser){
         check = false
        }
        const accessTokenUser =  createTokenUser(checkuser)
        res.status(201).json({
            success:check,
            token:accessTokenUser,
            user:{
                id: checkuser.id,
                username:checkuser.username,
            }
        })
    } catch (error) {
        next(error)
    }
}
