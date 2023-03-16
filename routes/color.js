var express = require('express')
var router = express.Router()
var pool = require("./pool")
var upload = require("./multer")

router.post("/colorsubmit",upload.single('icon'), function(req,res){
    try
    {
        pool.query("insert into colors(categoryid,subcategoryid,companyid,productid,colorname,icon) values(?,?,?,?,?,?)", [req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.colorname,req.file.originalname], function(error,result){
            if(error)
            {console.log(error)
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
        console.log("Error",e)
        res.status(500).json({result:false})
    }
})

router.get('/displayallcolors', function(req,res){
    try
    {
        pool.query("select L.*,(select categoryname from categories C where C.categoryid=L.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=L.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=L.companyid) as companyname,(select productname from products P where P.productid=L.productid) as productname from colors L", function(error,result){
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

router.post('/displayallcolorsbycompany', function(req,res){
    try
    {
        pool.query("select L.*,(select categoryname from categories C where C.categoryid=L.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=L.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=L.companyid) as companyname,(select productname from products P where P.productid=L.productid) as productname from colors L where L.companyid=?",[req.body.companyid], function(error,result){
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

router.post("/editcolorsubmit", function(req,res){
    try
    {
        pool.query("update colors set categoryid=?, subcategoryid=?, companyid=?, productid=?, colorname=? where colorid=?", [req.body.categoryId,req.body.subCategoryId,req.body.companyId,req.body.productId,req.body.colorName,req.body.colorId], function(error,result){
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

router.post("/editcolorpicture",upload.single('icon'), function(req,res){
    try
    {
        pool.query("update colors set icon=? where colorid=?", [req.file.originalname,req.body.colorId], function(error,result){
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
        console.log("Error",e)
        res.status(500).json({result:false})
    }
})

router.post('/deletecolor', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("delete from colors where colorid=?", [req.body.colorid],function(error,result){
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