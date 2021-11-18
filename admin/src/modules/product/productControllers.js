
import _ from 'lodash'
import productService from '../../services/productService'
const productControllers = {
    async index(req, res) {

        const { page = 1, perPage = 10, type = "", q = "" } = req.query
        const { data, total } = await productService.getProducts({ q, page, perPage })

        const state = {
            title: 'Sản phẩm',
            page,
            perPage,
            data,
            total,
            header: ["Hình ảnh", "Tên sản phẩm", "Danh mục", "Hãng sản xuất", "Giá nhập", "Giá bán", "Mô tả"]
        }

        res.render('products/index', { ...state, pagination: { page, limit: Math.ceil(total / perPage), perPage: perPage } })
    },

    async topSeller(req, res) {

        const { page = 1, perPage = 10, type = "" } = req.query
        const { data, total } = await productService.getTopSellers({ page, perPage, type })

        const state = {
            title: 'Top 10 sản phẩm bán chạy nhất',
            page,
            total,
            perPage,
            data,
            header: ["Hình ảnh", "Tên sản phẩm", "Danh mục", "Hãng sản xuất", "Giá nhập", "Giá bán", "Mô tả"]
        }

        res.render('products/top', { ...state, pagination: { page, limit: Math.ceil(total / perPage), perPage: perPage } })
    },

    async createProduct(req, res) {
        if (!_.isEmpty(req.body)) {
            const { name, categoryType: type, description, manufacturer: manufacturerName, originPrice, currentPrice, quantity } = req.body
            await productService.createProduct({ name, description, category: { type }, manufacturer: { name: manufacturerName }, quantity, originPrice, currentPrice })
            return res.redirect('/products/create')
        }

        const state = {
            title: 'Đơn hàng',
        }


        res.render('products/create', { ...state })
    }
}

export default productControllers