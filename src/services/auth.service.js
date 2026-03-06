import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken"


export async function findUserDoctorByUsername(username){
    const doctor = await prisma.docter.findFirst({
        where :{
            username,
        }
    })
    return doctor
}

export async function createDoctorUser(username,hash,specialization){
    const docterUser = await prisma.docter.create({
        data:{
            username,
            password:hash,
            specialization,
        }
    })
    return docterUser
}

export async function findUserPatientByUsername(username){
    const user = await prisma.user.findFirst({
        where :{
            username,
        }
    })
    return user
}

export async function createPatientUser(username,hash){
    const patientUser = await prisma.user.create({
        data:{
            username,
            password:hash,
        }
    })
    return patientUser
}

export async function createTokenDoctor(payload) {
    const token =jwt.sign(payload,process.env.JWT_SECRET_DOCTOR,{
        algorithm:"HS256",
        expiresIn:"1h"
    })
    return token
}
export function createTokenUser(user) {
    const payload ={
        id:user.id,
        username:user.username,
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET_USER,{
        algorithm:"HS256",
        expiresIn:"1d"
    })
    return token
}

export async function findUserPatientById(id){
    const user = await prisma.user.findFirst({
        where:{
            id:id,
        }
    })
    return user
}
export async function findDoctorPatientById(id){
    const doctor = await prisma.docter.findFirst({
        where:{
            id,
        }
    })
    return doctor
}

export async function updateUser(username,hashedpassword){
    const result = await prisma.user.update({
        where :{username},
        data:{
            username,
            password:hashedpassword
        }
    })
    return result
}
export async function updateDoctor(username,hashedpassword){
    const result = await prisma.docter.update({
        where :{username},
        data:{
            username,
            password:hashedpassword
        }
    })
    return result
}
