import express from "express";

import productControllers from "../controllers/productController";
const router = express.Router();

router.get("/tat-ca-san-pham", productControllers.allProducts);
router.get("/:id", productControllers.productDetail);

export default router;
