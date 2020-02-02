import Login from '../../Models/Auth/Login.Model'
import mysqlConnection from '../../Domain/Connection/Connection';
import * as authService from '../../Services/Auth/Auth.Service';
import crypto from 'crypto'
import { response } from 'express';
var jwt = require('jsonwebtoken');
export const registration=async(req,res,next)=>{
        const body=req.body;
        console.log(req.body);
        body.Password=crypto.createHash('md5').update(body.Password).digest("hex");
        authService.create(body,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            else{
                return res.status(200).json({
                    success:1,
                    data:result
                })
            }
        })

}
export const login=async(req,res,next)=>{
    try{
        var body=req.body;
        console.log(body);
       var userDB=authService.getUserByEmail(body,(err,result)=>{
           if(err){
              
               return res.status(500).json({
                   success:0,
                   message:err
               });
           }else{ 
            
               if(result!==undefined){
               if(result.Password==crypto.createHash("MD5").update(body.Password).digest("hex")){
                  
                const jsonToken=jwt.sign({user:response,roles:["Admin","Editor"]},"qwe123",{
                    expiresIn:"1h"
                })

                res.status(200).json({
                    success:1,
                    message:"login succesfully",
                    token:jsonToken
                })
               }else{
                   res.status(200).json({
                       success:0,
                       message:"invalid Password",                       
                   })
               }
               }else{
                   return res.status(200).json({
                       success:0,
                       message:"User Not Found"
                   });
               }
           }
       })
    }catch(err){
        console.log("mine"+err)
    }

}

export const logout=async(req,res,next)=>{
    try{
        var token=req.get("authorization");
       jwt.destroy(token);
       return res.json({
           success:1,
           message:"Logout Success"
       })
    }catch(err){
        return res.json({
            success:0,
            message:err
        })
    }
}

export const UserList=async(req,res,next)=>{
    try{
        mysqlConnection.query("SELECT * FROM Users",(err,rows,fields)=>{
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        });
    }catch(err){
        console.log(err);
    }
}
export const GetUserByID=async(req,res,next)=>{
    const body=req.body;
    authService.getUserById(body.UserID,(err,response)=>{
        if(err){
            console.log(err);
        }else{
            console.log(response)
            return res.status(200).json({
                success:1,
                data:response
            })
        }
    })
}

// export const login=async(req,res,next)=>{
//     var data="asdASD123";
//     crypto.createHash('MD5').update(data).digest("hex");
//     res.send(data);
// }