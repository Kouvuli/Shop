

const discountControllers = {
    async createDiscount(req, res) {

        const state = {
            title: 'Đơn hàng',
        }


        res.render('discounts/create', { ...state })

    },

}

export default discountControllers