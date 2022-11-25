const userModel = require("../model/user")
const bcrypt = require("bcrypt")
const {getData, cripyt} = require("./utills")


const newUser = async (req,res,next) => {
    const {name, email, password} = req.body
    const passwordHash = await cripyt(password)

    await userModel.create({
        name,
        email,
        password: passwordHash,
        createdAt: getData()
    }).then(() => {
        return next()
    }).catch((err) => {
        console.error(err)
        return res.status(500).json({
            msg: null,
            error: "Erro interno, tente novamente mais tarde!"
        })
    })
}

const login = async (req,res,next) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email: email})
    if(!user) return res.status(401).json({msg: null, error: "Usuario não encontrado!"})
    
    const hashCompare = await bcrypt.compare(password, user.password)
    if(!hashCompare) return res.status(401).json({msg: null, error: "Usuario não encontrado!"})
   
    return next()
}

module.exports = {
    newUser,
    login
}