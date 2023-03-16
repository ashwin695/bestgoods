var express = require('express')
var router = express.Router()
var pool = require("./pool")
var upload = require("./multer")

router.post("/modelsubmit",upload.single('modelicon'), function(req,res){
    try
    {
        pool.query("insert into models(categoryid, subcategoryid, companyid, productid, modelname, size, weight, modelicon) values(?,?,?,?,?,?,?,?)", [req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.modelname,req.body.size,req.body.weight,req.file.originalname], function(error,result){
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

router.get("/displayallmodels", function(req,res){
    try
    {
        pool.query("select M.*,(select categoryname from categories C where C.categoryid=M.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=M.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=M.companyid) as companyname,(select productname from products P where P.productid=M.productid) as productname from models M", function(error,result){
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

router.post("/displayallmodelsbycompany", function(req,res){
    console.log(req.body)
    try
    {
        pool.query("select M.*,(select categoryname from categories C where C.categoryid=M.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=M.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=M.companyid) as companyname,(select productname from products P where P.productid=M.productid) as productname from models M where M.companyid=?",[req.body.companyid], function(error,result){
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

router.post("/editmodelsubmit", function(req,res){
    try
    {
        pool.query("update models set categoryid=?, subcategoryid=?, companyid=?, productid=?, modelname=?, size=?, weight=? where modelid=?", [req.body.categoryId,req.body.subCategoryId,req.body.companyId,req.body.productId,req.body.modelName,req.body.size,req.body.weight,req.body.modelId], function(error,result){
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

router.post("/editmodelpicture",upload.single('modelicon'), function(req,res){
    try
    {
        pool.query("update models set modelicon=? where modelid=?", [req.file.originalname,req.body.modelId], function(error,result){
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

router.post('/deletemodel', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("delete from models where modelid=?", [req.body.modelid],function(error,result){
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