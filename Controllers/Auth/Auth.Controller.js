import Login from '../../Models/Auth/Login.Model'

export const login=async(req,res,next)=>{
    try{
        console.log("login");
    }catch(err){
        console.log(err)
    }
}

export const logout=async(req,res,next)=>{
    try{
        console.log("logout");
    }catch(err){
        console.log(err)
    }
}