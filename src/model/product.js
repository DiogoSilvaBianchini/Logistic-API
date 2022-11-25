const {Schema, model} = require("mongoose")

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    describe: {
        type: String
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updateAt: {
        type: String,
        required: true
    }
})

const ProductModel = model("Produtos", productSchema)

module.exports = ProductModel
