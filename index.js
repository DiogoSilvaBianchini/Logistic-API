require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const routes = require("./src/routes/routes")
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))
app.use(routes)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})