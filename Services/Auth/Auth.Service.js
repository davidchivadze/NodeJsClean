import mysqlConnection from '../../Domain/Connection/Connection'

module.exports={
   create:(data,callback)=>{
       mysqlConnection.query(
           "INSERT INTO `users`(`FirstName`, `LastName`, `Email`, `Mobile`, `Password`) VALUES (?,?,?,?,?)",
           [
               data.FirstName,
               data.LastName,
               data.Email,
               data.Mobile,
               data.Password
           ],
           (error,result,fields)=>{
               if(error){
                   callback(error)
               }
               return callback(null,result);
           }
       )
   },
   getUserById:(userID,callback)=>{
       mysqlConnection.query(
           "SELECT * FROM `users` WHERE ID=?",[userID],(error,result,fields)=>{
               if(error){
                   return callback(error)
               }else{
                   return callback(null,result);
               }
           }
       )
   },
   getUserByEmail:(data,callback)=>{
    
       mysqlConnection.query("SELECT * FROM `users` WHERE Email=?",[data.Email],(error,result,fields)=>{
           if(error){
               return callback(error);
           }else{
          
               return callback(null,result[0]);
           }
       })
   },
   getUserRoles:(UserID,callback)=>{
       var query="SELECT `roles`.`Description` FROM `users` INNER  JOIN `userroles`  ON `users`.`ID`=`userroles`.UserID INNER JOIN `roles` ON `roles`.`ID`=`userroles`.`RoleID` WHERE `users`.`ID`=?";
       mysqlConnection.query(query,[UserID],(error,result,fields)=>{
           if(error){
               return callback(error)
           }else{
               return callback(null,result);
           }
       })
   }

}