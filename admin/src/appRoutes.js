import express from "express";
import indexRoutes from './routes/indexRoutes'
import userRoutes from '../src/routes/userRoutes'
import productRoutes from '../src/routes/productRoutes'
import orderRoutes from '../src/routes/orderRoutes'
const routes = express.Router()

router.get("/", function (req, res, next) {
    res.render("trang-chu", { title: "Express", layout: "layouts/main" });
});

router.get("/chinh-sach-bao-mat", function (req, res, next) {
    res.render("chinh-sach-bao-mat", {
        title: "Express",
        layout: "layouts/main",
    });
});

router.get("/chinh-sach-doi-tra-hoan-tien", function (req, res, next) {
    res.render("chinh-sach-doi-tra-hoan-tien", {
        title: "Express",
        layout: "layouts/main",
    });
});

router.get("/chinh-sach-khach-si", function (req, res, next) {
    res.render("chinh-sach-khach-si", {
        title: "Express",
        layout: "layouts/main",
    });
});

router.get("/dieu-khoan-dich-vu", function (req, res, next) {
    res.render("dieu-khoan-dich-vu", {
        title: "Express",
        layout: "layouts/main",
    });
});

routes.use('/', indexRoutes)
routes.use('/users', userRoutes)
routes.use('/products', productRoutes)
routes.use('/orders', orderRoutes)


//Catch not found ***Place end of file**
routes.use((req, res) => {
    res.render('error/index')
})

export default routes
