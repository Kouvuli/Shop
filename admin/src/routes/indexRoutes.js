import express from "express";

const routes = express.Router()

routes.get('/', async (req, res) => {
    res.render('index', { layout: 'layouts/main', title: "Dashboard" })
})




export default routes