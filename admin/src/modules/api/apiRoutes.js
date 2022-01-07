import express from "express";
import apiControllers from "./apiControllers";
const routes = express.Router();

routes.post("/block", apiControllers.block);

export default routes;
