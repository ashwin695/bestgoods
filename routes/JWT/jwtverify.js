const jwt = require("jsonwebtoken")
//const config = require("../../jwtnodemon.json")
const secret = process.env.secretToken

const tokenverify = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token)
    {
        res.status(401).send({error: "Plesae authenticate using a valid token"})
    }
    try
    {
        const data = jwt.verify(token, secret)
        req.result = data.result
        next()
    }
    catch(error)
    {
        res.status(401).send({error: "Plesae authenticate using a valid token"})
    }   
}

module.exports = tokenverify