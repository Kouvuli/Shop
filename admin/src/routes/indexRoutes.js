import express from "express";

const routes = express.Router()

routes.get('/', (req, res) => {
    res.redirect('/login')

    // res.render('dashboard/index')
})

routes.get('/login', (req, res) => {

    res.render('login/index')
})

routes.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log({ username, password });

    res.render('login/index')
})



export default routes