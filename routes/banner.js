var express = require('express');
var router = express.Router()
var pool = require("./pool")
var upload = require("./multer")

router.post('/bannersubmit',upload.single('image'), function(req,res){
    try
    { console.log(req.body)
      console.log(req.file)
        pool.query("insert into banners(description,priority,image) values(?,?,?)",[req.body.description,req.body.priority,req.file.originalname],function(error,result){
            if(error)
            {  console.log(error)
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

router.get('/displayallbanner', function(req,res){
    try
    {
        pool.query("select * from banners", function(error,result){
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
        res.status(500).json({result:[]})
    }
})

router.post('/updatebannerdata', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("update banners set description=?, priority=? where bannerid=?", [req.body.description,req.body.priority,req.body.bannerId],function(error,result){
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

router.post('/bannereditimage',upload.single('image'), function(req,res){
    try
    { console.log(req.body)
      console.log(req.file)
        pool.query("update banners set image=? where bannerid=?",[req.file.originalname,req.body.bannerId],function(error,result){
            if(error)
            {  console.log(error)
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

router.post('/deletebanner', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("delete from banners where bannerid=?", [req.body.bannerid],function(error,result){
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