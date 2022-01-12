import userService from "../../services/userService";
import moment from "moment";
import orderService from "../../services/orderService";
const apiControllers = {
    async block(req, res) {
        const { id } = req.body;
        const data = await userService.blockToggleByUserId(id);
        res.json({ data });
    },
    async getAnalytics(req, res) {
        const { filter = "day" } = req.query;
        let dates = [];

        let now = moment();
        let last = moment(now).subtract(30, filter);

        for (let m = moment(last); m.isBefore(now, filter); m.add(1, filter)) {
            dates.push(m.format());
        }

        const { total, perPage } = await orderService.getOrders({});
        let orders = [];
        for (let i = 0; i < total / perPage; i++) {
            const { data } = await orderService.getOrders({ page: i });
            orders = [...orders, ...data];
        }

        let data = [];

        for (const date of dates) {
            const ordersInDuration =
                orders.filter(
                    (item) =>
                        item.createdAt &&
                        moment(item.createdAt).isSame(moment(date), filter)
                ) || [];

            const total = 0;
            for (const order of ordersInDuration) {
                const { cost = 0 } = order;
                total += cost;
            }
            data.push({ total, label: moment(date).format("DD-MM-YYYY") });
        }
        res.json({ data });
    },
};
export default apiControllers;
