import express from 'express';
import ApiRoutes from './Routes/App.Routes';   
import './Domain/Connection/Connection';
import swaggerUi from 'swagger-ui-express';
//import * as swaggerDocument from './swagger.json';
var bodyParser=require("body-parser");
var swaggerJsDoc=require("swagger-jsdoc");
const roles=require("user-groups-roles")
const cors=require("cors");

var swaggerOptions={
    swaggerDefinition:{
        info:{
            title:"NodeJS Api",
            description:"NodeJS",
            contact:{
                name:"David Chivadze"
            }
        },
        servers:["http://localhost:3000"]
    },
    apis:["./Routes/*.js"]

};
const swaggerDocs=swaggerJsDoc(swaggerOptions);
const app=express();

// app.use(bodyParser.urlencoded({extended:true,limit:'10000kb'}))
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
// app.use(function(req,res,next){
//     res.header('Access-Control-Allow-Origin',"*")
//     res.header( 'Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
//     res.header( 'Access-Control-Allow-Headers','Content-Type')
//     next()
// })

app.use(cors());
app.use(bodyParser.json());

app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
app.use('/api',ApiRoutes);


app.get("/customers",(req,res)=>{
    res.send("Test Customers");
})



const port=3000;

app.listen(port,()=>{
   
    console.log(`Running on localhost:${port}`)});
