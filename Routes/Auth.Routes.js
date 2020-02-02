import {Router} from 'express'
import * as AuthController from '../Controllers/Auth/Auth.Controller'
import * as Auth from '../MiddleWares/Auth/Authorization.MiddleWare'
const routes=new Router();
/** 
* @swagger
* /api/auth/login/{userId}:
*    post:
*        summary: login
*        description: |
*          User Login
*        tags:
*          - Auth
*        parameters:
*        - in: path
*          name: userId
*          schema:
*            type: integer
*          required: true
*          description: Numeric ID of the user to get
*        responses:
*          200:
*            description: boolean
*/
routes.post("/login",AuthController.login)
/** 
* @swagger
* /api/auth/registration:
*    post:
*       summary: registration
*       description: |
*         User registration
*       tags:
*         - Auth
*       parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             FirstName:
*               type: string
*             LastName:
*               type: string
*             Email:
*               type: string
*             Password:
*               type: string
*             Mobile:
*               type: string
*         required:
*           - username
*           - password
*/
routes.post("/registration",AuthController.registration)
/** 
* @swagger
* /api/auth/getUserByID:
*    get:
*       summary: GetUser
*       description: |
*         Get User
*       tags:
*         - Auth
*       responses:
*         200:
*           description: Array of users
*       parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             UserID:
*               type: integer
*/
routes.get("/getUserByID",Auth.Authorized,Auth.HasAdminRole,AuthController.GetUserByID)

routes.get("/logout",Auth.Authorized,AuthController.logout)
/** 
* @swagger
* /api/auth/getUsers:
*    get:
*        summary: Users
*        description: |
*          Get Users
*        tags:
*          - Auth
*        responses:
*          200:
*            description: Array of users
*/
routes.get("/getUsers",AuthController.UserList)
// routes.get("/testMD5",AuthController.TestMD5)


export default routes;