require("../database/db")
const express = require("express")
const routes = express.Router()
const userRoutes = require("./userRoutes")
const productRoutes = require("./productsRoutes")

routes.use("/user", userRoutes)
routes.use("/product", productRoutes)

routes.get("/", (req,res) => {
    return res.status(200).json({msg: "ok"})
})

module.exports = routes