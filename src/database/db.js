const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://diogoBianchini:${process.env.DB_KEY}@cluster0.6wlsh0q.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("Database connect")
}).catch(err => {
    console.error(err)
})

module.exports = mongoose