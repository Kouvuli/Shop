

const discountControllers = {
    async createDiscount(req, res) {

        const state = {
            title: 'Đơn hàng',
        }


        res.render('discounts/create', { ...state, layout: 'layouts/main' })

    },

}

export default discountControllers