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
    async updateCart(req, res) {
        const userId = req.user || req.sessionID;
        const { productId, quantity } = req.body;
        const data = await cartService.updateItemCart({
            productId,
            quantity,
            userId,
        });

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
            status: "shipping",
            payment,
            address,
            products,
        });
        await cartService.deleteById(_id);

        res.json({ data, _id });
    },
    async createComment(req, res) {
        const userId = req.user || req.sessionID;
        const { id: productId } = req.params;
        const { content } = req.body;
        try {
            const data = await productService.createCommentByProductId({
                productId,
                userId,
                content,
            });
            res.json({ data });
        } catch (e) {
            console.log({ e });

            res.status(500).json({ e });
        }
    },
    async getCommentsByProductId(req, res) {
        const { page = 1, perPage = 10 } = req.query;
        const { id: productId } = req.params;
        try {
            const { data, total } = await productService.getCommentsByProductId(
                {
                    page,
                    perPage,
                    productId,
                }
            );
            res.json({ data, total });
        } catch (e) {
            console.log({ e });
            res.status(500).json({ e });
        }
    },
};
export default apiControllers;
