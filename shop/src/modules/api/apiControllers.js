import cartService from "../../services/cartService";
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
};
export default apiControllers;
