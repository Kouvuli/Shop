import orderService from "../../services/orderService"


const orderControllers = {
    async index(req, res) {

        const { page = 1, perPage = 3 } = req.query

        const { data, total } = await orderService.getOrders({ page, perPage })

        const state = {
            title: 'Đơn hàng',
            page,
            total,
            perPage,
            data,
            header: ["Mã đơn hàng", "Tên người mua", "Ngày mua", "Đơn giá", "Khuyến mãi", "Phải thanh toán", "Tình trạng"]
        }
        res.render('orders/index', { ...state, pagination: { page, limit: Math.ceil(total / perPage), perPage: perPage } })
    },

}

export default orderControllers