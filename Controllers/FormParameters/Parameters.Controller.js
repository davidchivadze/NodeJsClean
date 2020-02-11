
import ParametersService from '../../Services/Parameters/Parameters.service';
module.exports={
    GetProductList:(req,res,next)=>{
        var body=req.body;
        ParametersService.GetCurrencyList(body,(err,result)=>{
            if(err){
            return res.status(500).json({
                success:0,
                message:err
            })
            }else{
                return res.status(200).json({
                    success:1,
                    currencyList:result
                })
            }
        })
    },
    GetCategoriesList:(req,res,next)=>{
        var body=req.body;
        ParametersService.GetCategoriesList(body,(err,result)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
              }else{
                  return res.status(200).json({
                      success:1,
                      categoriesList:result
                  })
              }
        });

    }
}