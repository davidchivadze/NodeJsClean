import {Router} from 'express'
import ParametesController from '../Controllers/FormParameters/Parameters.Controller'

const routes=new Router();

routes.get('/GetCurrencyList',ParametesController.GetProductList);
routes.get('/GetCategoriesList',ParametesController.GetCategoriesList);

export default routes;