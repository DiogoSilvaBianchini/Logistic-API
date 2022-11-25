const express = require("express")
const routes = express.Router()

const {newUser, login} = require("../controllers/userController")
const { createToken } = require("../middlewares/userMiddlewares")

routes.post("/registerUser", newUser, (req,res) => {
    return res.status(200).json({msg: "Usuario cadastrado com sucesso!", error: null})
})

routes.post("/login", login, createToken, (req,res) => {
    return res.status(200).json({msg: req.token, error: null})
})

module.exports = routes