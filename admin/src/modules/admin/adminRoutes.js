import express from "express";
import multer from "../../middleware/multer";

import adminControllers from "./adminControllers";
const routes = express.Router();

routes.get("/", adminControllers.index);
routes.get("/create", adminControllers.createAdmin);
routes.get("/edit", adminControllers.editAdmin);

routes.post("/create", multer.single("avatar"), adminControllers.createAdmin);
routes.post("/edit", multer.single("avatar"), adminControllers.editAdmin);
routes.get("/:id", adminControllers.getById);

export default routes;
