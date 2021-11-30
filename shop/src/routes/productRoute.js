import express from "express";

import productControllers from "../controllers/productController";
const router = express.Router();

router.get("/", productControllers.allProducts);
router.get("/:id", productControllers.productDetail);

export default router;
