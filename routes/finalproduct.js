var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")

router.post("/finalproductsubmit",upload.single('icon'), function(req,res){
    try
    {  console.log(req.body)
        console.log(req.file)
        pool.query("insert into finalproducts(categoryid, subcategoryid, companyid, productid, colorid, modelid, description, price, offerprice, stock, size, icon, productstatus) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.colorid,req.body.modelid,req.body.description,req.body.price,req.body.offerprice,req.body.stock,req.body.size,req.file.originalname,req.body.productstatus], function(error,result){
            if(error)
            {  console.log(error)
                res.status(500).json({result:false})
            }
            else
            {  console.log("Result",result.insertId)
                res.status(200).json({result:true,finalproductid:result.insertId})
            }
        })
    }
    catch(e)
    {
        console.log("Error",e)
        res.status(500).json({result:false})
    }
})

router.post("/savemorepictures",upload.any(), function(req,res){
    console.log(req.body)
    console.log(req.files)
    var q="insert into morepictures(finalproductid,image) values ?"
    pool.query(q,[req.files.map((item)=>[req.body.finalproductid,item.filename])], function(error,result){
        if(error)
        {
            return res.status(500).json({result:false})
        }
        else
        {
            return res.status(200).json({result:true})
        }
    })
})

router.get("/displayallfinalproducts", function(req,res){
    console.log("BODY:",req.body)
    try
    {  
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=F.companyid) as companyname,(select productname from products P where P.productid=F.productid) as productname,(select colorname from colors R where R.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproducts F", function(error,result){
            if(error)
            {  console.log(error)
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

router.get("/displayallfinalproductstrending", function(req,res){
    console.log("BODY:",req.body)
    try
    {  
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=F.companyid) as companyname,(select productname from products P where P.productid=F.productid) as productname,(select colorname from colors R where R.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproducts F where productstatus='trending'", function(error,result){
            if(error)
            {  console.log(error)
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

router.get("/displayallfinalproductsexcepttrending", function(req,res){
    console.log("BODY:",req.body)
    try
    {  
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=F.companyid) as companyname,(select productname from products P where P.productid=F.productid) as productname,(select colorname from colors R where R.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproducts F where productstatus not in('trending')", function(error,result){
            if(error)
            {  console.log(error)
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

router.get("/displayallfinalproductsexceptnewarrival", function(req,res){
    console.log("BODY:",req.body)
    try
    {  
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=F.companyid) as companyname,(select productname from products P where P.productid=F.productid) as productname,(select colorname from colors R where R.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproducts F where productstatus not in('new arrival')", function(error,result){
            if(error)
            {  console.log(error)
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

router.get("/displayallfinalproductsnewarrival", function(req,res){
    console.log("BODY:",req.body)
    try
    {  
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=F.companyid) as companyname,(select productname from products P where P.productid=F.productid) as productname,(select colorname from colors R where R.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproducts F where productstatus='new arrival'", function(error,result){
            if(error)
            {  console.log(error)
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

router.post("/displayallfinalproductsbysubcategoryid", function(req,res){
    console.log("BODY:",req.body)
    try
    {  
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=F.companyid) as companyname,(select productname from products P where P.productid=F.productid) as productname,(select colorname from colors R where R.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproducts F where F.subcategoryid=?",[req.body.subcategoryid], function(error,result){
            if(error)
            {  console.log(error)
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

router.post("/displayallfinalproductsbyproductid", function(req,res){
    console.log("BODY:",req.body)
    try
    {  
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=F.companyid) as companyname,(select productname from products P where P.productid=F.productid) as productname,(select colorname from colors R where R.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproducts F where F.finalproductid=?",[req.body.finalproductid], function(error,result){
            if(error)
            {  console.log(error)
                res.status(500).json({data:[]})
            }
            else
            {
                res.status(200).json({data:result[0]})
            }
        })
    }
    catch(e)
    {
        console.log("Error:", e)
        res.status(500).json({data:[]})
    }
})

router.post('/displayorderbyfinalproductid', function(req, res){
    try
    {
        pool.query("select * from finalproducts where finalproductid=?",[req.body.finalproductid], function(error,result){
            if(error)
            {
                res.status(500).json({result:[]})
            }
            else
            {
                res.status(200).json({result:result})
            }
        })
    }
    catch(e)
    {
        console.log("Error:", e)
        res.status(500).json({result:[]})
    }
  })

router.post("/displayallfinalproductsbyprice", function(req,res){
    console.log("BODY:",req.body)
    try
    {  
        pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from companies B where B.companyid=F.companyid) as companyname,(select productname from products P where P.productid=F.productid) as productname,(select colorname from colors R where R.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproducts F where F.subcategoryid=? and F.price between ? and ?",[req.body.subcategoryid, req.body.min, req.body.max], function(error,result){
            if(error)
            {  console.log(error)
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

router.post("/editfinalproductsubmit", function(req,res){
    try
    {
        pool.query("update finalproducts set categoryid=?, subcategoryid=?, companyid=?, productid=?, colorid=?, modelid=?, description=?, price=?, offerprice=?, stock=?, size=? where finalproductid=?", [req.body.categoryId,req.body.subCategoryId,req.body.companyId,req.body.productId,req.body.colorId,req.body.modelId,req.body.description,req.body.price,req.body.offerPrice,req.body.stock,req.body.size,req.body.finalProductId], function(error,result){
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

router.post("/editfinalproductpicture",upload.single('icon'), function(req,res){
    try
    {
        pool.query("update finalproducts set icon=? where finalproductid=?", [req.file.originalname,req.body.finalProductId], function(error,result){
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

router.post('/deletefinalproduct', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("delete from finalproducts where finalproductid=?", [req.body.finalproductid],function(error,result){
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