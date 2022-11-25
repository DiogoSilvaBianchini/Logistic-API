const express = require("express")
const routes = express.Router()

const {newProduct, searchAllProducts, searchProducts, removeProduct, updateProduct} = require("../controllers/productsController")
const { authToken } = require("../middlewares/userMiddlewares")

routes.get("/seachAllProducts", searchAllProducts)
routes.get("/seachProducts", searchProducts)

routes.post("/create", authToken, newProduct)

routes.delete("/:id/deleteProduct", authToken, removeProduct)

routes.put("/:id/updateProduct", authToken, updateProduct)
module.exports = routes