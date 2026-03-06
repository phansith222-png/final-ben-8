import bcrypt from 'bcrypt'
import { findUserDoctorByUsername, updateDoctor } from '../services/auth.service.js'

export async function getDoctorUser(req,res,next) {
    const {username} = req.doctor
    const finddoctor = await findUserDoctorByUsername(username)
    res.status(200).json({
        id:finddoctor.id,
        username:finddoctor.username,
        specialization:finddoctor.specialization,
    })
}
export async function putDocterUser(req,res,next) {
    const {username,password,specialization} = req.doctor
    try {
        const hashedpassword = await bcrypt.hash(password,5)
        const doctor = await updateDoctor(username,hashedpassword,specialization)
        const findUser = await findUserDoctorByUsername(doctor.username)
        res.status(200).json({
            message:"Profile updated successfully",
            user:{
                id:findUser.id,
                username:findUser.username,
                specialization:findUser.specialization,

            }
        })
    } catch (error) {
        
    }
}