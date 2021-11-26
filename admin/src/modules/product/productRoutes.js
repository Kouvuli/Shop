import express from "express";
import productControllers from "./productControllers";
import multer from "../../middleware/multer";
const routes = express.Router()



routes.get('/', productControllers.index)

routes.get('/top', productControllers.topSeller)

routes.get('/create', productControllers.createProduct)
routes.post('/create', multer.array('image', 2), productControllers.createProduct)

routes.get('/edit/:id', productControllers.editProduct)
routes.post('/edit/:id', multer.array('image', 2), productControllers.editProduct)

routes.get('/confirm/:id', productControllers.confirmScreen)

routes.get('/delete/:id/:status', productControllers.deleteProduct)

export default routes