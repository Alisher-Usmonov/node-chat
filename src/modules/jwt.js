const { sign, verify } = require("jsonwebtoken")

module.exports.generateJWTToken = (data) => {
   return sign(data, "SECRET_WORD") 
}

module.exports.checkJWTToken = (token) => {
    try {
        return verify(token, "SECRET_WORD")
    } catch(e) {
        return false
    }
}