import express from "express";
import multer from "../../middleware/multer";

import adminControllers from "./adminControllers";
const routes = express.Router()

routes.get('/', adminControllers.index)
routes.get('/create', adminControllers.createAdmin)
routes.post('/create', multer.single('avatar'), adminControllers.createAdmin)

routes.get('/:id', adminControllers.getById)


export default routes