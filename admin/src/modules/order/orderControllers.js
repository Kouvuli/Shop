import orderService from "../../services/orderService"


const orderControllers = {
    async index(req, res) {

        const { page = 1, per_page = 10 } = req.query

        const { data, total } = await orderService.getOrders({ page, perPage: per_page })
        const state = {
            title: 'Đơn hàng',
            page,
            total,
            perPage: per_page,
            data,
            header: ["Mã đơn hàng", "Tên người mua", "Ngày mua", "Đơn giá", "Khuyến mãi", "Phải thanh toán", "Tình trạng"]
        }
        res.render('orders/index', { ...state })
    },

}

export default orderControllers