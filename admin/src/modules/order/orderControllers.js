import orderService from "../../services/orderService"


const orderControllers = {
    async index(req, res) {

        const { page = 1, per_page = 10 } = req.query

        const data = await orderService.getOrders()
        const state = {
            title: 'Đơn hàng',
            page: page,
            perPage: per_page,
            data,
            header: ["Mã đơn hàng", "Tên người mua", "Ngày mua", "Đơn giá", "Khuyến mãi", "Phải thanh toán", "Tình trạng"]
        }
        res.render('orders/index', { ...state, layout: 'layouts/main' })
    },

}

export default orderControllers