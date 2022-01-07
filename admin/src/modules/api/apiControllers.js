import userService from "../../services/userService";

const apiControllers = {
    async block(req, res) {
        const { id } = req.body;
        const data = await userService.blockToggleByUserId(id);
        res.json({ data });
    },
};
export default apiControllers;
