import express from "express";
import productControllers from "./productControllers";
const routes = express.Router()



routes.get('/', productControllers.index)

routes.get('/top', productControllers.topSeller)

routes.all('/create', productControllers.createProduct)
routes.all('/edit/:id', productControllers.editProduct)

routes.get('/confirm/:id', productControllers.confirmScreen)

routes.get('/delete/:id/:status', productControllers.deleteProduct)

export default routes