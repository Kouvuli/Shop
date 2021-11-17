import express from "express";
import userControllers from "./userControllers";
const routes = express.Router()


routes.get('/', userControllers.index)

routes.get('/login', userControllers.login)


export default routes