import mysqlConnection from '../../Domain/Connection/Connection';
module.exports={
    GetCurrencyList:(body,callback)=>{
        let query="SELECT * FROM `currency`";
        mysqlConnection.query(query,(err,result)=>{
            if(err){
                return callback(err);
            }else{
                return callback(null,result);
            }
        })
    },
    GetCategoriesList:(body,callback)=>{
            var query="SELECT * FROM `product_categories`"
            mysqlConnection.query(query,(err,result)=>{
                if(err){
                    return callback(err);
                }else{
                    return callback(null,result)
                }
            })

    }
}