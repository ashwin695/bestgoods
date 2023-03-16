var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/companysubmit',upload.single('icon'), function(req,res){
    try
    { console.log(req.body)
      console.log(req.file)
        pool.query("insert into companies(companyname,companyaddress1,companyaddress2,country,state,city,zipcode,contactperson,mobileno,email,description,icon) values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyname,req.body.companyaddress1,req.body.companyaddress2,req.body.country,req.body.state,req.body.city,req.body.zipcode,req.body.contactperson,req.body.mobileno,req.body.email,req.body.description,req.file.originalname],function(error,result){
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

router.get('/displayallcompany', function(req,res){
    try
    {
        pool.query("select * from companies", function(error,result){
            if(error)
            {
                res.status(500).json({data:[]})
            }
            else
            {
                res.status(200).json({data:result})
            }
        })
    }
    catch(e)
    {
        console.log("Error:", e)
        res.status(500).json({data:[]})
    }
})

router.post('/updatecompanydata', function(req,res){
    console.log(req.body)
    try
    {
        pool.query("update companies set companyname=?,companyaddress1=?,companyaddress2=?,country=?,state=?,city=?,zipcode=?,contactperson=?,mobileno=?,email=?,description=? where companyid=?", [req.body.companyName,req.body.companyAddress1,req.body.companyAddress2,req.body.companyCountry,req.body.companyState,req.body.companyCity,req.body.companyPincode,req.body.contactPerson,req.body.mobileno,req.body.email,req.body.companyDescription,req.body.companyId],function(error,result){
            if(error)
            {
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

router.post('/companyeditpicture',upload.single('icon'), function(req,res){
    try
    { console.log(req.body)
      console.log(req.file)
        pool.query("update companies set icon=? where companyid=?", [req.file.originalname,req.body.companyId],function(error,result){
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

router.post('/deletecompany', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("delete from companies where companyid=?", [req.body.companyid],function(error,result){
        if(error)
        {
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
module.exports=router;