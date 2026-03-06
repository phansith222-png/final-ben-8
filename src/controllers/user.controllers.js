import createError from 'http-errors'


export async function getUser(req,res,next) {
    const {id,username} = req.user
    res.status(200).json({
        id,
        username,
    })
}