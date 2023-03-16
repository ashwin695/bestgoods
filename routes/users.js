const e = require('express');
var express = require('express');
var router = express.Router();
var pool = require("./pool")
//const config = require("../jwtnodemon.json")
const jwt = require("jsonwebtoken")
const secret = process.env.secretToken

router.post('/checkuserbymobilenumber', function(req, res, next) {
  try
  { var q = "select * from users where mobileno=?"
    pool.query(q, [req.body.mobileno], function(error,result){
      if(error)
      {
        res.status(500).json({result:false})
      }
      else
      {
        if(result.length>0)
        {
          const token = jwt.sign({sub:result}, secret, {
            expiresIn: "1h"
          })

          return res.status(200).json({
            result:true,
            data:result[0],
            token: token
          })
        }
        else
        {
          res.status(500).json({result:false, data:[], msg:"Mobile No. not Available"})
        }
      }
    })
  }
  catch(e)
  {
    res.status(500).json("catch error")
  }
});

router.post('/checkuserlogin', function(req, res, next) {
  pool.query("select * from users where (mobileno=? or emailid=?) and password=?",[req.body.emailid, req.body.emailid, req.body.password], function(error,result){
    if(error)
    {
      res.status(500).json({result:false})
    }
    else
    {
      if(result.length>0)
      {
        res.status(200).json({result:true, data:result[0]})
      }
      else
      {
        res.status(500).json({result:false, data:[]})
      }
    }
  })
});

router.post('/insertintouser', function(req, res, next) {
  pool.query("insert into users values(?,?,?,?,?)",[req.body.mobileno, req.body.emailid, req.body.firstname, req.body.lastname, req.body.password], function(error,result){
    if(error)
    { console.log(error)
      res.status(500).json({result:false})
    }
    else
    {
      res.status(200).json({result:true})
    }
  })
})

router.post('/updateuser', function(req,res){
  pool.query("update users set firstname=?, lastname=?, emailid=? where mobileno=?", [req.body.firstname, req.body.lastname, req.body.emailid, req.body.mobileno], function(error,result){
    if(error)
      {  console.log(error)
          res.status(500).json({result:false})
      }
      else
      {
          res.status(200).json({result:true})
      }
  })
})

router.post('/checkuseraddress', function(req, res, next) {
  console.log(req.body)
  pool.query("select * from usersaddress where usermobileno=?",[req.body.mobileno], function(error,result){
    if(error)
    {
      res.status(500).json({result:false})
    }
    else
    {
      if(result.length>0)
      {
        res.status(200).json({result:true, data:result})
      }
      else
      {
        res.status(500).json({result:false, data:[]})
      }
    }
  })
});

router.post('/fetchaddressbyid', function(req,res){
  pool.query("select * from usersaddress where addressid=?", [req.body.addressid], function(error,result){
    if(error)
    {
      res.status(500).json({result:false})
    }
    else
    { console.log(result)
      res.status(200).json({result:result[0]})
    }
  })
})


router.post('/addnewaddress', function(req, res, next) {
  pool.query("insert into usersaddress(mobileno,addressone,addresstwo,state,city,zipcode,firstname,lastname,usermobileno) values(?,?,?,?,?,?,?,?,?)",[req.body.mobileno,req.body.addressone,req.body.addresstwo,req.body.state,req.body.city,req.body.zipcode,req.body.firstname,req.body.lastname,req.body.usermobileno], function(error,result){
    if(error)
    {
      res.status(500).json({result:false})
    }
    else
    {
      res.status(200).json({result:true})
    }
  })
});

router.post('/editaddress', function(req,res){
  pool.query("update usersaddress set mobileno=?, addressone=?, addresstwo=?, state=?, city=?, zipcode=?, firstname=?, lastname=? where addressid=?", [req.body.mobileno, req.body.addressone, req.body.addresstwo, req.body.state, req.body.city, req.body.zipcode, req.body.firstname, req.body.lastname, req.body.addressid], function(error,result){
    if(error)
    { console.log(error)
      res.status(500).json({result:false})
    }
    else
    {
      res.status(200).json({result:true})
    }
  })
})

router.post('/deleteaddress', function(req,res){
  console.log("BODY:",req.body)
  try
  {
    pool.query("delete from usersaddress where addressid=?", [req.body.addressid], function(error,result){
      if(error)
      { console.log(error)
        res.status(500).json({result:false})
      }
      else
      {
        res.status(200).json({result:true})
      }
    })
  }
  catch(e)
  {
      console.log("Error:", e)
      res.status(500).json({result:false})
  }
})

router.get('/displayalladdress', function(req, res, next) {
  pool.query("select * from usersaddress", function(error,result){
    if(error)
    {
      res.status(500).json({result:false})
    }
    else
    {
      res.status(200).json({result:result})
    }
  })
});

module.exports = router;