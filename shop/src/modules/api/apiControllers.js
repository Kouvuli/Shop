import cartService from "../../services/cartService";
import orderService from "../../services/orderService";
import productService from "../../services/productService";
const apiControllers = {
    async addToCart(req, res) {
        const userId = req.user || req.sessionID;
        const { productId, quantity } = req.body;
        const data = await cartService.addToCart({
            userId,
            productId,
            quantity,
        }); //userId:userId
        res.json({ success: true, data });
    },
    async createOrder(req, res) {
        const userId = req.user || null;
        const { address = {}, payment = {} } = req.body;

        const { items, _id } = await cartService.getCartByUserId({ userId });
        let products = [];
        for (const item of items) {
            const productId = item.productId || item._id;
            if (productId) {
                const { currentPrice: price = 0 } =
                    await productService.getProductById({
                        id: productId,
                    });
                products.push({ ...item, price });
            }
        }
        const data = await orderService.createOrder({
            userId,
            status: "pending",
            payment,
            address,
            products,
        });
        await cartService.deleteById(_id);

        res.json({ data, _id });
    },
};
export default apiControllers;
