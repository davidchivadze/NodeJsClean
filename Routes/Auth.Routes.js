import {Router} from 'express'
import * as AuthController from '../Controllers/Auth/Auth.Controller'

const routes=new Router();

routes.post("/login",AuthController.login)

routes.get("/logout",AuthController.logout)


export default routes;