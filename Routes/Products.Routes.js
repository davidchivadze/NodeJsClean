import {Router} from 'express'
import * as Auth from '../MiddleWares/Auth/Authorization.MiddleWare'
import AddProductModel from '../Models/Products/AddProduct.Model'
import * as ProductsController from '../Controllers/Products/Products.Controller'
const routes=new Router();

routes.post('/addNewProduct',Auth.HasAdminRole,ProductsController.AddProduct);
routes.get('/getAllProducts',ProductsController.GetAllProduct);

module.exports=routes;