import express from "express";
import discountControllers from "./discountControllers";
const routes = express.Router()

routes.get('/', discountControllers.index)
routes.all('/create', discountControllers.createDiscount)

export default routes