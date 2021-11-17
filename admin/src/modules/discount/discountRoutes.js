import express from "express";
import discountControllers from "./discountControllers";
const routes = express.Router()


routes.get('/create', discountControllers.createDiscount)

export default routes