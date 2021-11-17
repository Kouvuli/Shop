
import productModel from "../../models/productModel"

const productControllers = {
    async index(req, res) {

        const { page = 1, per_page = 10 } = req.query
        const data = await productModel.find({})

        const state = {
            title: 'Sản phẩm',
            page: page,
            perPage: per_page,
            data,
            header: ["Hình ảnh", "Tên sản phẩm", "Danh mục", "Hãng sản xuất", "Giá nhập", "Giá bán", "Mô tả"]
        }

        res.render('products/index', { ...state, layout: 'layouts/main' })
    },

    async topSeller(req, res) {

        const { page = 1, per_page = 10 } = req.query
        const data = await productModel.find({})

        const state = {
            title: 'Top 10 sản phẩm bán chạy nhất',
            page: page,
            perPage: per_page,
            data,
            header: ["Hình ảnh", "Tên sản phẩm", "Danh mục", "Hãng sản xuất", "Giá nhập", "Giá bán", "Mô tả"]
        }

        res.render('products/top', { ...state, layout: 'layouts/main' })
    },

    async createProduct(req, res) {
        const state = {
            title: 'Đơn hàng',
        }


        res.render('products/create', { ...state, layout: 'layouts/main' })
    }
}

export default productControllers