import express from "express";
import apiControllers from "./apiControllers";
const routes = express.Router();

routes.post("/block", apiControllers.block);
routes.get("/analytics", apiControllers.getAnalytics);
export default routes;
