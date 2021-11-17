
import productService from '../../services/productService'
const productControllers = {
    async index(req, res) {

        const { page = 1, per_page = 10, type = "Tai nghe" } = req.query
        const { data, total } = await productService.getProducts({ page, perPage: per_page, type })

        const state = {
            title: 'Sản phẩm',
            page,
            perPage: per_page,
            data,
            total,
            header: ["Hình ảnh", "Tên sản phẩm", "Danh mục", "Hãng sản xuất", "Giá nhập", "Giá bán", "Mô tả"]
        }

        res.render('products/index', { ...state })
    },

    async topSeller(req, res) {

        const { page = 1, per_page = 10, type = "Tai nghe" } = req.query
        const { data, total } = await productService.getTopSellers({ page, perPage: per_page, type })

        const state = {
            title: 'Top 10 sản phẩm bán chạy nhất',
            page,
            total,
            perPage: per_page,
            data,
            header: ["Hình ảnh", "Tên sản phẩm", "Danh mục", "Hãng sản xuất", "Giá nhập", "Giá bán", "Mô tả"]
        }

        res.render('products/top', { ...state })
    },

    async createProduct(req, res) {
        const state = {
            title: 'Đơn hàng',
        }


        res.render('products/create', { ...state })
    }
}

export default productControllers