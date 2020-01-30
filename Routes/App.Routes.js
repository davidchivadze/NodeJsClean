import {Router} from 'express';
import path from 'path';

import AuthRoutes from './Auth.Routes';

const routes=new Router();

routes.use("/auth",AuthRoutes);

export default routes;