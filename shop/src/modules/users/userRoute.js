import express from "express";
import userControllers from "./userController";
const router = express.Router();

router.get("/profile", userControllers.profile);

router.get("/cart", userControllers.cart);
router.get("/payCart", userControllers.payCart);
router.get("/notifications", userControllers.notification);
router.get("/likes", userControllers.liked);

export default router;
