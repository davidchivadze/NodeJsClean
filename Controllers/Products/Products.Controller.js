import mysqlConnection from '../../Domain/Connection/Connection';
import ProductService from '../../Services/Products/Product.Service';
import e from 'express';


 export const AddProduct=async (req,res,next)=>{
        var body=req.body;
        ProductService.SaveProduct(body,(err,result)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }else{
                console.log(result);
                return res.status(200).json({
                    success:1,
                    message:"Successfully Add"
                })
            }
        })
 };
 export const GetAllProduct=async(req,res,next)=>{
     var body=req.query;
     console.log(req.query);
     ProductService.GetAllProducts(body,(err,result)=>{
         if(err){
             return res.status(500).json({
                 success:0,
                 message:err
             })
         }else{
             return res.status(200).json({
                 success:1,
                 products:result
             })
         }
     })
 }