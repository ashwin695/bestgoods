var express = require('express');
var router = express.Router();
var pool = require('./pool')
//const config = require("../jwtnodemon.json")
const jwt = require("jsonwebtoken")
const secret = process.env.secretToken

/* GET users listing. */
router.post('/checklogin', function(req, res, next) {
  pool.query("select * from admins where emailid=? and password=?", [req.body.emailid,req.body.password], function(error,result){
      if(error)
      {  console.log(error)
          res.status(500).json({result:false})
      }
      else
      { console.log(result.length)
          if(result.length==1)
          {
              const token = jwt.sign({sub:result}, secret, {
                expiresIn: "1h"
              })
              req.token = token
              res.status(200).json({result:true,token: token})
          }
          else
          {
              res.status(200).json({result:false})
          }
      }
  })
});

module.exports = router;