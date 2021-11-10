import express from "express";

const routes = express.Router()


routes.get('/', (req, res) => {
    //?q=monggo
    const { q } = req.query

    const { title } = req.body

    const data = {}
    // bookService.create({ title: data.title, ...})
    res.render('trang-chu')
})
routes.get('/books', (req, res) => {
    res.render('index');
});
routes.get('/books/:id', (req, res) => {
    const { id } = req.params

    res.render('index');
});
export default routes