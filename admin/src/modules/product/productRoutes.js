import express from "express";
import productControllers from "./productControllers";
const routes = express.Router()



routes.get('/', productControllers.index)

routes.get('/top', productControllers.topSeller)

routes.all('/create', productControllers.createProduct)

export default routes