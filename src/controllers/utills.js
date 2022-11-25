const bcrypt = require("bcrypt")

const getData = () => {
    const date = new Date()
    const dataUTC = date.toUTCString()

    return dataUTC
}

const cripyt = async (data) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(data, salt)

    return hash
}


module.exports = {
    getData,
    cripyt
}