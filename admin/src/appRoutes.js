import express from "express";

const routes = express.Router()


routes.get('/', (req, res) => {

    res.render('index')
})
routes.get('/books', (req, res) => {
    res.render('index');
});
routes.get('/books/:id', (req, res) => {
    const { id } = req.params

    res.render('index');
});
export default routes