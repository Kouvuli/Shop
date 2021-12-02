import express from "express";
import passport from "passport";
import indexControllers from "./indexControllers";
import auth from "../../middleware/auth";
const routes = express.Router()

routes.get('/', auth, indexControllers.index)


routes.get('/login', indexControllers.login)

routes.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?failure=true',
    failureFlash: false
}))

routes.get('/logout', indexControllers.logout)


export default routes