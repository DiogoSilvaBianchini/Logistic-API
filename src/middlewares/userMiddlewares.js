const userModel = require("../model/user")
const jwt = require("jsonwebtoken")

const createToken = async (req,res,next) => {
    const {email} = req.body
    const id = await userModel.findOne({email})

    const payLoad = {
        _id: id._id,
        email,
    }
    const token = jwt.sign(payLoad, process.env.JWT_KEY)
    req.token = token
    return next()
}

const authToken = async (req, res, next) => {
    const token = req.headers.token
    try {
        jwt.verify(token, process.env.JWT_KEY)
        return next()
    }catch (error) {
        console.error(error)
        return res.status(401).json({msg: null, error: "Token Invalido!"})
    }
}

module.exports = {
    createToken,
    authToken
}