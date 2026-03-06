import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { updateUser } from '../services/auth.service.js'

export async function getUser(req,res,next) {
    const {id,username} = req.user
    res.status(200).json({
        id,
        username,
    })
}
export async function putUser(req,res,next) {
    const {username,password} = req.user
    try {
        const hashedpassword = await bcrypt.hash(password,5)
        const user = await updateUser(username,hashedpassword)
        const findUser = await findUserPatientByUsername(user.username)
        res.status(200).json({
            message:"Profile updated successfully",
            user:{
                id:findUser.id,
                username:findUser.username,

            }
        })
    } catch (error) {
        
    }
}