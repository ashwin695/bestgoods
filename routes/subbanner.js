var express = require('express');
var router = express.Router()
var pool = require("./pool")
var upload = require("./multer")

router.post("/savesubbannerimages",upload.any(), function(req,res){
    var q="insert into subbanners(categoryid,subcategoryid,image) values ?"
    pool.query(q,[req.files.map((item)=>[req.body.categoryid,req.body.subcategoryid,item.filename])], function(error,result){
        if(error)
        { console.log(error)
            return res.status(500).json({result:false})
        }
        else
        {
            return res.status(200).json({result:true})
        }
    })
})

router.get('/displayallsubbanner', function(req,res){
    try
    {
        pool.query("select Sb.*,(select categoryname from categories C where C.categoryid=Sb.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=Sb.subcategoryid) as subcategoryname from subbanners Sb", function(error,result){
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

router.post('/displayallsubbannerbyid', function(req,res){
    try
    {
        pool.query("select Sb.*,(select categoryname from categories C where C.categoryid=Sb.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=Sb.subcategoryid) as subcategoryname from subbanners Sb where subcategoryid=?",[req.body.subcategoryid], function(error,result){
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

router.post('/deletesubbanner', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("delete from subbanners where subbannerid=?", [req.body.subbannerid],function(error,result){
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

router.post('/updatesubbannerdata', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("update subbanners set categoryid=?, subcategoryid=? where subbannerid=?", [req.body.categoryId,req.body.subCategoryId,req.body.subBannerId],function(error,result){
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

router.post('/subbannereditimage',upload.single('image'), function(req,res){
    try
    { console.log(req.body)
      console.log(req.file)
        pool.query("update subbanners set image=? where subbannerid=?",[req.file.originalname,req.body.subBannerId],function(error,result){
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
module.exports=router;