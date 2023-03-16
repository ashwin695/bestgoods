const { expressjwt: jwt } = require("express-jwt")
//const config = require("../../jwtnodemon.json")
const secret = process.env.secretToken

function jwtconfig() {
    //const { secret } = config
    return jwt({secret, algorithms: ["RS256", "HS256"],}).unless({
        path: [
            //public routes that don't require authentication
            "/users/checkuserbymobilenumber",
            "/admin/checklogin"
            
        ],
    })
}

module.exports = jwtconfig