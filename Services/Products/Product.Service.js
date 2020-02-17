import mysqlConnecton from '../../Domain/Connection/Connection';
var async = require('async');
import mysqlConnection from '../../Domain/Connection/Connection';
import { json } from 'body-parser';
import { response } from 'express';
var returnResult=[];
function SetProductImages(product,Images){
    product.Images=Images;
    returnResult.push(product);
}
module.exports={
    SaveProduct:(body,callback)=>{
        var query="INSERT INTO `products`(`product_categories_id`, `title`, `short_description`, `full_description`, `imageURLs`, `Count`, `price`, `CurrencyID`) VALUES (?,?,?,?,?,?,?,?)";
        mysqlConnection.query(query,[body.CategorieID,body.Title,body.ShortDescription,body.FullDescription,body.ImageURLs,body.Count,body.Price,body.CurrencyID],(err,result)=>{
            if(err){
                 return callback(error)
            }else{
                return callback(null,result);
            }
        })
    },
    GetAllProducts:(paginationOption,callback)=>{
        let query="SELECT * FROM `products` ORDER BY ID LIMIT ?, ?";
        mysqlConnection.query(query,[parseInt(paginationOption.skip),parseInt(paginationOption.take)],(err,result)=>{
            if(err){
                return callback(err);
            }else{
                
                //return callback(null,result);
                var i=1;
                result.forEach(element => {
                  
                    let query="SELECT * FROM `product_images` WHERE `ProductID`=?";
                    mysqlConnection.query(query,element.ID,(err,response)=>{
                        SetProductImages(element,response);
                       
                        if(i==result.length){
                            return callback(null,returnResult);
                        }else{
                            i++
                        }
                    })
               
                });
                return callback(null,returnResult);
                
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
    }
}