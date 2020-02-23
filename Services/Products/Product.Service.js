import mysqlConnecton from '../../Domain/Connection/Connection';
var async = require('async');
import mysqlConnection from '../../Domain/Connection/Connection';
import { json } from 'body-parser';
import e, { response } from 'express';
var returnResult=[];
function SetProductImages(product,Images){
    product.Images=Images;
    returnResult.push(product);
    // console.log(returnResult);
}

module.exports={
    SaveProduct:(body,callback)=>{
        var query="INSERT INTO `products`(`product_categories_id`, `title`, `short_description`, `full_description`, `imageURLs`, `Count`, `price`, `CurrencyID`) VALUES (?,?,?,?,?,?,?,?)";
        var insertImagesQuery="INSERT INTO `product_images` (`Image`,`ProductID`) VALUES(?,?)";
        mysqlConnection.query(query,[body.CategorieID,body.Title,body.ShortDescription,body.FullDescription,body.ImageURLs,body.Count,body.Price,body.CurrencyID],(err,result)=>{
            if(err){
                 return callback(error)
            }else{

                     
                        return callback(null,result);


            
        }
    })
},
    GetAllProducts:async (paginationOption,callback)=>{
        let query="SELECT * FROM `products` ORDER BY ID LIMIT ?, ?";
        mysqlConnection.query(query,[parseInt(paginationOption.skip),parseInt(paginationOption.take)],(err,result)=>{
            if(err){
                return callback(err);
            }else{
         

                return callback(null,result);
                
            }
        })
    },
    GetProductImages:(productID,callback)=>{
        let query="SELECT * FROM `product_images` WHERE `ProductID`=?";
        mysqlConnection.query(query,parseInt(productID),(err,result)=>{
            if(err){
                return callback(err);
            }else{
                return callback(null,result);
            }
        })
    },
    AddProductImage:(ProductID,Image,callback)=>{
        // console.log(ProductID,Image);
        var query="INSERT INTO `product_images` (`Image`,`ProductID`) VALUES(?,?)";
        mysqlConnection.query(query,[Image,parseInt(ProductID)],(err,result)=>{
            console.log(err);
        if(err){
            return callback(err)
        }else{
            return callback(null,result);
        }
        })
    },
    GetEditProduct:(ProductID,callback)=>{
        var query="SELECT * FROM `products` WHERE `ID`=?";
        mysqlConnection.query(query,[ProductID],(err,result)=>{
            if(err){
                return callback(err);
            }else{
                return callback(null,result[0]);
            }
        })
    }
}