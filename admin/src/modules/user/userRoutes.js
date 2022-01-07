import express from "express";

import userControllers from "./userControllers";
const routes = express.Router();

routes.get("/", userControllers.index);
routes.get("/:id", userControllers.getById);

export default routes;
