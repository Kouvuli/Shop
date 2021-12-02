import express from "express";
import passport from "passport";
import authController from "../controllers/authController";
const router = express.Router();

router.get("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/register", authController.register);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login?wrong=true',
    failureFlash: false
}))
export default router;
