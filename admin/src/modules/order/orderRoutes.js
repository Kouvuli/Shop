import express from "express";
import orderControllers from "./orderControllers";
const routes = express.Router()


routes.get('/', orderControllers.index)

export default routes