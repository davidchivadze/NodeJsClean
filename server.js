import express from 'express';
import ApiRoutes from './Routes/App.Routes';

var mysql=require("mysql");
var bodyParser=require("body-parser");


const app=express();
app.use('/api',ApiRoutes);

const port=3000;

app.listen(port,()=>console.log(`Running on localhost:${port}`));