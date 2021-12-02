import express from "express";

import adminControllers from "./adminControllers";
const routes = express.Router()

routes.get('/', adminControllers.index)
routes.all('/create', adminControllers.createAdmin)


export default routes