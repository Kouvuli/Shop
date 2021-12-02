import express from "express";

import userControllers from "./userControllers";
const routes = express.Router()

routes.get('/', userControllers.index)

export default routes