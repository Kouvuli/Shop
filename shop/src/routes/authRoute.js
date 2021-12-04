import express from "express";
import passport from "passport";
import authController from "../controllers/authController";
const router = express.Router();

router.get("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/forgot-password", authController.forgot);
router.post("/forgot-password", authController.sendEmail);

router.post("/register", authController.register);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login?wrong=true',
    failureFlash: false
}))
export default router;
