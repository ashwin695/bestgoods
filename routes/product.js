var express = require('express')
var router = express.Router()
var pool = require("./pool")
var upload = require("./multer")

router.post("/productsubmit",upload.single('producticon'), function(req,res){
    try
    {
        pool.query("insert into products(categoryid,subcategoryid,companyid,productname,description,status,producticon) values(?,?,?,?,?,?,?)", [req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productname,req.body.description,req.body.status,req.file.originalname], function(error,result){
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
        console.log("Error",e)
        res.status(500).json({result:false})
    }
})

router.get('/displayallproducts', function(req,res){
    try
    {
        pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=P.companyid) as companyname from products P", function(error,result){
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

router.post('/displayallproductsbysubcategory', function(req,res){
    console.log(req.body)
    try
    {
        pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=P.companyid) as companyname from products P where P.subcategoryid=?",[req.body.subcategoryid], function(error,result){
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

router.post('/displayallproductsbycompany', function(req,res){
    console.log(req.body)
    try
    {
        pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=P.companyid) as companyname from products P where P.productid=?",[req.body.productid], function(error,result){
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

router.post("/editproductsubmit", function(req,res){
    try
    {
        pool.query("update products set categoryid=?, subcategoryid=?, companyid=?, productname=?, description=?, status=? where productid=?", [req.body.categoryId,req.body.subCategoryId,req.body.companyId,req.body.productName,req.body.description,req.body.status,req.body.productId], function(error,result){
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

router.post("/editproductpicture",upload.single('producticon'), function(req,res){
    try
    {
        pool.query("update products set producticon=? where productid=?", [req.file.originalname,req.body.productId], function(error,result){
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

router.post('/deleteproduct', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("delete from products where productid=?", [req.body.productid],function(error,result){
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