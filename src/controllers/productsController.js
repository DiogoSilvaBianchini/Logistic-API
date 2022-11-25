const ProductModel = require("../model/product")
const UserModel = require("../model/user")
const {getData} = require("./utills")
const jwt = require("jsonwebtoken")


const searchAllProducts = async(req, res) => {
    await ProductModel.find({}, ["-createdAt", "-updateAt", "-__v"]).then((e) => {
        return res.status(200).json({msg: e})
    }).catch((err) => {
        console.error(err)
        return res.status(500).json({msg: null, error: "Erro interno, tente novamente mais tarde!"})
    })
}

const searchProducts = async(req, res) => {
    const { name, type } = req.body
    const response = []

    if(!name && !type) return res.status(401).json({msg: false, error: "Ao menos 1 campo de se preenchido!"})
    
    try {
        const products = await ProductModel.find({}, ["-createdAt", "-updateAt", "-__v"])

        if(name){
            for(x in products){
                if(products[x].name.includes(name)) response.push(products[x])
            }
        }else if(type){
            for(x in products){
                if(products[x].type.includes(type)) response.push(products[x])
            }
        }

        return res.status(200).json({msg: response, error: null})
       
    } catch (err) {
        console.error(err)
        return res.status(500).json({msg: null, error: "Erro interno, tente novamente mais tarde!"})
    }
}

const newProduct = async(req,res) => {
    const {name, type, describe} = req.body
    const token = jwt.decode(req.headers.token, process.env.JWT_KEY)
    const user = await UserModel.findById(token._id)

    await ProductModel.create({
        name: name.toLowerCase(),
        type: type.toLowerCase(),
        describe,
        createdBy: user.name,
        createdAt: getData(),
        updateAt: getData()
    }).then(() => {
        return res.status(201).json({msg: "Produto criado com sucesso", error: null})
    }).catch((err) => {
        console.error(err)
        return res.status(500).json({msg: null, error: "Erro interno, tente novamente mais tarde!"})
    })
}

const removeProduct = async(req,res) =>{
    const {id} = req.params

    ProductModel.findOneAndDelete({_id: id}).then((seach) => {
        if(!seach) return res.status(401).json({msg: null, error: "Produto não encontrado"})
        return res.status(200).json({msg: "Produto deletado com sucesso", error: null})
    }).catch((err) => {
        console.error(err)
        return res.status(500).json({msg: null, error: "Erro interno, tente novamente mais tarde!"})
    })
}

const updateProduct = async(req,res) =>{
    const {name, type, describe} = req.body
    const {id} = req.params

    ProductModel.findOneAndUpdate({_id: id}, {name, type, describe, updateAt: getData()}).then((seach) => {
        if(!seach) return res.status(401).json({msg: null, error: "Produto não encontrado"})
        return res.status(200).json({msg: "Produto deletado com sucesso", error: null})
    }).catch((err) => {
        console.error(err)
        return res.status(500).json({msg: null, error: "Erro interno, tente novamente mais tarde!"})
    })
}

module.exports = {
    newProduct,
    searchAllProducts,
    searchProducts,
    removeProduct,
    updateProduct
}