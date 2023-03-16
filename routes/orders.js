var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require("./multer")

router.post("/orderdatasubmit", function(req,res){
    try
    {  console.log(req.body)
        console.log(req.file)
        var q = "insert into orders(orderdate, finalproductid, productimage, productname, modelname, colorname, price, offerprice, qty, amount, billingname, emailid, mobileno, usermobileno, address, city, state, zipcode, paymentmode, paymenttype, transactionid, deliverystatus, status, invoiceno) values ?"
        pool.query(q, [req.body.cart.map((item) => [req.body.orderdate, item.finalproductid, item.icon, item.productname, item.modelname, item.colorname, item.price, item.offerprice, item.qty, req.body.amount, req.body.billingname, req.body.emailid, req.body.mobileno, req.body.usermobileno, req.body.address, req.body.city, req.body.state, req.body.zipcode, req.body.paymentmode, req.body.paymenttype, req.body.transactionid, req.body.deliverystatus, req.body.status, req.body.invoiceno])], function(error,result){
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

router.post('/checkuserorder', function(req, res, next) {
    console.log(req.body)
    pool.query("select * from orders where usermobileno=? group by invoiceno, orderdate, amount, status, deliverystatus order by orderdate desc",[req.body.mobileno], function(error,result){
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

router.post('/displayproductsbyinvoiceno', function(req,res){
  console.log("INVOICENO:",req.body)
  pool.query("select * from orders where invoiceno=?", [req.body.invoiceno], function(error,result){
    if(error)
    {
      res.status(500).json({result:false, data:[]})
    }
    else
    {
      res.status(200).json({result:true, data:result})
    }
  })
})

router.post('/displaybyinvoiceno', function(req,res){
  console.log("INVOICENO:",req.body)
  pool.query("select * from orders where invoiceno=?", [req.body.invoiceno], function(error,result){
    if(error)
    {
      res.status(500).json({result:false, data:[]})
    }
    else
    {
      res.status(200).json({result:true, data:result})
    }
  })
})

router.post('/displayallorders', function(req,res){
    pool.query("select * from orders where orderid=?",[req.body.orderid], function(error,result){
      if(error)
      {
        res.status(500).json({result:false})
      }
      else
      {
        res.status(200).json({result:result[0]})
      }
    })
  })

router.post('/cancelorder', function(req,res){
  pool.query("update orders set status='Cancelled' where invoiceno=?", [req.body.invoiceno], function(error,result){
    if(error)
    {
      res.status(500).json({result:false})
    }
    else
    {
      res.status(200).json({result:true})
    }
  })
})
module.exports = router