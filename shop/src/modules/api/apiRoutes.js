import express from "express";
import apiControllers from "./apiControllers";
const routes = express.Router();

routes.post("/cart/add", apiControllers.addToCart);
routes.post("/cart/update", apiControllers.updateCart);

routes.post("/order", apiControllers.createOrder);
routes.post("/products/:id/comments", apiControllers.createComment);
routes.get("/products/:id/comments", apiControllers.getCommentsByProductId);

//routes.get("/analytics", apiControllers.getAnalytics);
export default routes;
