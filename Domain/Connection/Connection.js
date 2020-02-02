
const mysql=require("mysql");

var mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    passwor:"",
    database:"nodejs",
    multipleStatements:true

});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("mysql Connected");
    }else{
        console.log("Mysql Connection Error");
    }
})

export default mysqlConnection;