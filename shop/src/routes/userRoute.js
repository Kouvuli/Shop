import express from "express";
import userControllers from "../controllers/userController";
const router = express.Router();

router.get("/profile", userControllers.profile);

router.get("/cart", userControllers.cart);
router.get("/notifications", userControllers.notification);
router.get("/likes", userControllers.liked);

export default router;
