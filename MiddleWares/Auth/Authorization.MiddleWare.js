const jwt=require('jsonwebtoken');

module.exports={
    Authorized:(req,res,next)=>{
        var token=req.get("authorization");
        if(token){     
            jwt.verify(token,'qwe123',(err,decoded)=>{
                if(err){
                   return res.json({
                        success:0,
                        message:err
                    })
                }else{  
                    console.log(decoded);               
                    next();
                }
            })
        }else{
            return res.json({
                success:0,
                message:"Access Denided"
            })
        }
    },
    HasAdminRole:(req,res,next)=>{
        var token=req.get("authorization");
        if(token){
        jwt.verify(token,'qwe123',(err,decoded)=>{
            if(err){
               return res.json({
                    success:0,
                    message:err
                })
            }else{  
               if(decoded.roles.includes("Admin")){
                             
                next();
            }else{
                return res.json({
                    success:0,
                    message:"User Has no Permision"
                })
            }
            }
        })
    }else{
        return res.json({
            success:0,
            message:"Access Denided"
        })
    }
    },
    HasUserRole:(req,res,next)=>{
        var token=req.get("authorization");
        if(token){
        jwt.verify(token,'qwe123',(err,decoded)=>{
            if(err){
               return res.json({
                    success:0,
                    message:err
                })
            }else{  
               if(decoded.roles.includes("User")){
                             
                next();
            }else{
                return res.json({
                    success:0,
                    message:"User Has no Permision"
                })
            }
            }
        })
    }else{
        return res.json({
            success:0,
            message:"Access Denided"
        })
    }
    }
}