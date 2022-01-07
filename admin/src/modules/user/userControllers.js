import userService from "../../services/userService";

const userControllers = {
    async index(req, res) {
        const { page = 1, perPage = 10 } = req.query;

        const { data, total } = await userService.getUsers({ page, perPage });
        const state = {
            title: "Danh sách người dùng",
            page,
            total,
            perPage,
            data,
            header: [
                "Tên người dùng",
                "Tên đăng nhập",
                "Email",
                "Địa chỉ",
                "Ngày sinh",
            ],
        };
        res.render("users/index", {
            ...state,
            pagination: {
                page,
                limit: Math.ceil(total / perPage),
                perPage: perPage,
            },
        });
    },
    async getById(req, res) {
        const { id } = req.params;
        const data = await userService.getUserById({ id });
        res.render("users/detail", { data, title: data.name });
    },
};

export default userControllers;
