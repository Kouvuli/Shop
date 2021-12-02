import _ from "lodash"
import discountService from "../../services/discountService"

const discountControllers = {
    async index(req, res) {

        const { page = 1, perPage = 10 } = req.query

        const { data, total } = await discountService.getDiscounts({ page, perPage })

        const state = {
            title: 'Đợt giảm giá',
            page,
            total,
            perPage,
            data,
            header: ["Tên", "Phần trăm giảm giá", "Người nhận", "Hạn dùng"]
        }
        res.render('discounts/index', { ...state, pagination: { page, limit: Math.ceil(total / perPage), perPage: perPage } })
    },
    async createDiscount(req, res) {
        if (!_.isEmpty(req.body)) {

            const { name, value, userId, expiry } = req.body
            await discountService.createDiscount({ name, value, userId, expiry })
            return res.redirect('/discounts/create')
        }
        const state = {
            title: 'Tạo khuyến mãi',
        }


        res.render('discounts/create', { ...state })

    },

}

export default discountControllers