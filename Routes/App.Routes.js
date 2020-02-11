import {Router} from 'express';
import path from 'path';
import Auth from '../MiddleWares/Auth/Authorization.MiddleWare';

import AuthRoutes from './Auth.Routes';
import ProductRoutes from './Products.Routes';
import FormParameters from './FormParameters.Routes';

const routes=new Router();

routes.use("/auth",AuthRoutes);
routes.use("/products",Auth.Authorized,ProductRoutes)
routes.use("/FormParameters",FormParameters)
export default routes;