var express=require("express");
var router=express.Router()
var pool=require("./pool")
var upload=require("./multer")

router.post('/subcategorysubmit',upload.single('subcategoryicon'), function(req,res){
    try
    {console.log(req.body)
     console.log(req.file)
        pool.query("insert into subcategories(categoryid,subcategoryname,subcategorydescription,subcategoryicon) value(?,?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.body.subcategorydescription,req.file.originalname],function(error,result){
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
        console.log("Error:",e)
        res.status(500).json({result:false})
    }
})

router.get('/displayallsubcategory', function(req,res){
    try
    {
        pool.query("select S.*,(select categoryname from categories C where C.categoryid=S.categoryid) as categoryname from subcategories S",function(error,result){
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
        console.log("Error:",e)
        res.status(500).json({result:[]})
    }
})

router.post('/displayallsubcategorybycategory', function(req,res){
    console.log(req.body)
    try
    {
        pool.query("select S.*,(select categoryname from categories C where C.categoryid=S.categoryid) as categoryname from subcategories S where S.categoryid=?", [req.body.categoryid], function(error,result){
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
        console.log("Error:",e)
        res.status(500).json({result:[]})
    }
})

router.post('/updatesubcategorydata', function(req,res){
    console.log(req.body)
    try
    {
    pool.query("update subcategories set subcategoryname=?,categoryid=?,subcategorydescription=? where subcategoryid=?", [req.body.subCategoryName,req.body.categoryId,req.body.subCategoryDescription,req.body.subCategoryId],function(error,result){
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
        console.log("Error:",e)
        res.status(500).json({result:false})
    }
})

router.post('/subcategoryeditpicture',upload.single('subcategoryicon'), function(req,res){
    try
    {console.log(req.body)
     console.log(req.file)
        pool.query("update subcategories set subcategoryicon=? where subcategoryid=?",[req.file.originalname,req.body.subCategoryId],function(error,result){
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
        console.log("Error:",e)
        res.status(500).json({result:false})
    }
})

router.post('/deletesubcategory', function(req,res){
    console.log("BODY:",req.body)
    try
    {
    pool.query("delete from subcategories where subcategoryid=?", [req.body.subcategoryid],function(error,result){
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